import { useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // For LCP images
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onClick?: () => void;
}

/**
 * Responsive Image Component
 * - Supports AVIF/WebP with JPEG fallback
 * - Generates srcset for 1x/2x resolutions
 * - Lazy loading by default (unless priority=true)
 * - Object-fit support for proper image rendering
 * - Lightbox-ready with onClick handler
 */
export default function ResponsiveImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  objectFit = "cover",
  onClick,
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate different format versions
  const getImageSources = (baseSrc: string) => {
    const ext = baseSrc.split(".").pop();
    const baseWithoutExt = baseSrc.replace(`.${ext}`, "");

    return {
      avif: `${baseWithoutExt}.avif`,
      webp: `${baseWithoutExt}.webp`,
      jpeg: baseSrc,
    };
  };

  const sources = getImageSources(src);

  // Generate srcset for different resolutions
  const generateSrcSet = (imageSrc: string) => {
    return `${imageSrc} 1x, ${imageSrc} 2x`;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ width, height }}
        />
      )}

      {/* Picture element with multiple formats */}
      <picture>
        {/* AVIF format (best compression) */}
        <source
          type="image/avif"
          srcSet={generateSrcSet(sources.avif)}
          onError={() => {
            // Silently fail and fallback to next format
          }}
        />

        {/* WebP format (good compression, wide support) */}
        <source
          type="image/webp"
          srcSet={generateSrcSet(sources.webp)}
          onError={() => {
            // Silently fail and fallback to next format
          }}
        />

        {/* JPEG fallback (universal support) */}
        <img
          src={sources.jpeg}
          srcSet={generateSrcSet(sources.jpeg)}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{
            objectFit,
            imageRendering: "crisp-edges",
          }}
        />
      </picture>
    </div>
  );
}

/**
 * Lightbox Image Component
 * - Wrapper for ResponsiveImage with lightbox functionality
 * - Click to open full-size image in modal
 */
interface LightboxImageProps extends ResponsiveImageProps {
  fullSizeSrc?: string;
}

export function LightboxImage({
  fullSizeSrc,
  ...props
}: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ResponsiveImage
        {...props}
        onClick={() => setIsOpen(true)}
        className={`${props.className} cursor-pointer hover:opacity-90 transition-opacity`}
      />

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-7xl max-h-screen">
            <button
              className="absolute top-4 right-4 text-white text-4xl font-light hover:opacity-70 transition-opacity z-10"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <ResponsiveImage
              src={fullSizeSrc || props.src}
              alt={props.alt}
              className="max-w-full max-h-screen"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

