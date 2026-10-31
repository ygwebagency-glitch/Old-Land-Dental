import { useEffect, useRef, useState, type CSSProperties } from "react";
import { getImage, type ImageKey } from "@/config/images";
import { cn } from "@/lib/utils";
import { HouseMark } from "./LogoMark";

type Props = {
  imageKey?: ImageKey;
  src?: string;
  alt?: string;
  /** CSS aspect ratio e.g. "16/9". Pass "none" when the parent sizes the box (use `fill`). */
  aspect?: string;
  focal?: string;
  priority?: boolean;
  sizes?: string;
  /** Absolutely fill the parent instead of defining an aspect box */
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  /** Fixed-height containers can pass a style */
  style?: CSSProperties;
};

/**
 * Every image on the site renders through here: fixed-aspect box,
 * object-fit cover with focal point, shimmer skeleton, fade-in, and a
 * branded fallback if the source fails — never a broken-image icon.
 */
export function SmartImage({
  imageKey,
  src,
  alt,
  aspect,
  focal,
  priority,
  sizes,
  fill,
  className,
  imgClassName,
  imgStyle,
  style,
}: Props) {
  const entry = imageKey ? getImage(imageKey) : undefined;
  const finalSrc = src ?? entry?.src ?? "";
  const finalAlt = alt ?? entry?.alt ?? "";
  const finalAspect = aspect ?? entry?.aspect ?? "4/3";
  const finalFocal = focal ?? entry?.focal ?? "50% 50%";
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!finalSrc);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete) {
      if (el.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [finalSrc]);

  return (
    <div
      className={cn("overflow-hidden bg-sand", fill ? "absolute inset-0" : "relative w-full", className)}
      style={{ ...(fill || finalAspect === "none" ? {} : { aspectRatio: finalAspect }), ...style }}
    >
      {!loaded && !failed && !priority ? <div aria-hidden className="absolute inset-0 animate-shimmer" /> : null}
      {failed ? (
        <div
          role="img"
          aria-label={finalAlt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-gradient p-4 text-center"
        >
          <HouseMark className="h-12 w-14 text-charcoal/60" />
          {imageKey ? <span className="text-xs tracking-widest text-ink-muted uppercase">{imageKey}</span> : null}
        </div>
      ) : (
        <img
          ref={ref}
          src={finalSrc}
          alt={finalAlt}
          width={entry?.width}
          height={entry?.height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700 ease-[var(--ease-premium)]",
            loaded || priority ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
          style={{ objectFit: "cover", objectPosition: finalFocal, ...imgStyle }}
        />
      )}
    </div>
  );
}
