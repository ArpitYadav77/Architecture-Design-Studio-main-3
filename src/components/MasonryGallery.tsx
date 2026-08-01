import { memo, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MasonryGalleryProps {
  images: string[];
  /** Optional — title or descriptive text */
  title?: string;
  /** Optional — category label above title */
  category?: string;
}

/**
 * Premium Gallery component with a '1 + Grid' hierarchy.
 * First image is shown large (full width), followed by a responsive grid for secondary views.
 */
const MasonryGallery = memo<MasonryGalleryProps>(({ images, title, category }) => {
  if (!images || images.length === 0) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleNext, handlePrev, closeLightbox]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const firstImage = images[0];
  const secondaryImages = images.slice(1);

  return (
    <div className="w-full pb-16 sm:pb-20">
      {/* Header section — matches site's architectural aesthetic */}
      {(title || category) && (
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <div className="w-1 h-10 sm:h-12 bg-accent shadow-[0_0_15px_rgba(var(--accent),0.3)]" />
          <div>
            {category && (
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent mb-1 font-semibold">
                {category}
              </p>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-foreground leading-tight">
                {title.split(" ").map((word, i) => 
                  i === title.split(" ").length - 1 ? <em key={i} className="italic">{word}</em> : word + " "
                )}
              </h2>
            )}
          </div>
        </div>
      )}

      {/* Primary Featured Image (Full Width) */}
      <div 
        onClick={() => openLightbox(0)}
        className="mb-6 sm:mb-8 overflow-hidden group cursor-zoom-in rounded-lg shadow-sm hover:shadow-2xl transition-all duration-700 ease-out bg-white/5 border border-foreground/[0.03]"
      >
        <img
          src={firstImage}
          alt="Primary featured view"
          loading="lazy"
          className="w-full h-auto object-contain transition-all duration-1000 ease-out transform group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Secondary Images Grid — iPad Optimized (2 cols) & Desktop (3 cols) */}
      {secondaryImages.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {secondaryImages.map((src, idx) => (
            <div 
              key={`${src}-${idx}`}
              onClick={() => openLightbox(idx + 1)}
              className="relative overflow-hidden group cursor-zoom-in rounded-lg shadow-sm hover:shadow-2xl transition-all duration-700 ease-out bg-white/5 border border-foreground/[0.03] break-inside-avoid mb-6"
            >
              <img
                src={src}
                alt={`Gallery view ${idx + 2}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain transition-all duration-1000 ease-out transform group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-700 pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal via Portal */}
      {isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-8 z-[10000] p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 shadow-lg z-[10000] cursor-pointer hidden sm:block"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image Container */}
          <div 
            className="relative flex items-center justify-center max-w-[90vw] max-h-[75vh] sm:max-h-[80vh] select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Full size view ${currentIndex + 1}`}
              className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded animate-fade-in duration-300 shadow-2xl"
            />
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 shadow-lg z-[10000] cursor-pointer hidden sm:block"
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Mobile Bottom Navigation controls (visible on smaller screens for easy tap) */}
          <div className="flex sm:hidden items-center gap-6 mt-6 z-[10000]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-white/60 font-mono text-sm tracking-widest">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Desktop Visual Indicator (Counter) */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:text-sm font-mono tracking-widest z-[10000] hidden sm:block pointer-events-none">
            {currentIndex + 1} / {images.length}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
});

MasonryGallery.displayName = "MasonryGallery";

export default MasonryGallery;
