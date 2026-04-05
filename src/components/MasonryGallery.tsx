import { memo } from "react";

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
      <div className="mb-6 sm:mb-8 overflow-hidden group cursor-zoom-in rounded-lg shadow-sm hover:shadow-2xl transition-all duration-700 ease-out bg-white/5 border border-foreground/[0.03]">
        <img
          src={firstImage}
          alt="Primary featured view"
          loading="lazy"
          className="w-full h-auto object-contain transition-all duration-1000 ease-out transform group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Secondary Images Grid (3 Columns) — Left to Right Sequence */}
      {secondaryImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
          {secondaryImages.map((src, idx) => (
            <div 
              key={`${src}-${idx}`}
              className="relative overflow-hidden group cursor-zoom-in rounded-lg shadow-sm hover:shadow-2xl transition-all duration-700 ease-out bg-white/5 border border-foreground/[0.03]"
            >
              <img
                src={src}
                alt={`Gallery view ${idx + 2}`}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[3/2] object-cover transition-all duration-1000 ease-out transform group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-700 pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

MasonryGallery.displayName = "MasonryGallery";

export default MasonryGallery;
