"use client";
import React from "react";
import { getLogoSrcset, getLogoFallback } from "../services/logoService";

export default function OptimizedLogo({ name, width = 250, height, alt = "Logo", cssClass = "" }) {
  const srcset = getLogoSrcset(name);
  const fallback = getLogoFallback(name);

  return (
    <picture className="block">
      {srcset && <source srcSet={srcset} type="image/webp" />}
      <img
        src={fallback || name}
        alt={alt}
        width={width}
        height={height || undefined}
        className={`max-w-full height-auto ${cssClass}`}
        loading="lazy"
      />
    </picture>
  );
}
