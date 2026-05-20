import { memo, useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  /** 'eager' for hero/above-fold images, 'lazy' (default) for everything else */
  loading?: "lazy" | "eager";
  /** Aspect ratio hint to prevent CLS, e.g. "4/3", "16/9" */
  aspectRatio?: string;
  sizes?: string;
  onClick?: () => void;
}

/**
 * Performance-optimized image component:
 * - Lazy-loads by default (native loading="lazy")
 * - Uses decoding="async" to avoid main-thread decode blocking
 * - Supports aspect-ratio for CLS prevention
 * - Fade-in on load for a polished feel
 * - Memoized to prevent re-renders
 */
const OptimizedImage = memo(({
  src,
  alt,
  className = "",
  loading = "lazy",
  aspectRatio,
  sizes,
  onClick,
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle images that are already cached (complete before onLoad fires)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      sizes={sizes}
      onClick={onClick}
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.4s ease-out",
        ...(aspectRatio ? { aspectRatio } : {}),
      }}
    />
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
