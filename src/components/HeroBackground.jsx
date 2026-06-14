"use client";
import React from "react";
import dynamic from "next/dynamic";

const HeroVideoPlayer = dynamic(() => import("./HeroVideoPlayer"), {
  ssr: false,
  loading: () => null,
});

export default function HeroBackground({
  hlsUrl,
  bgImage = "https://cdn.mentholatumarabia.com/web/home-hero.webp",
  isHome = false,
  children,
}) {
  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center h-[50vh] md:h-[70vh] lg:h-[90vh]">
      {/* LCP image — plain tag, no JS wrapper, visible immediately */}
      <img
        src={bgImage}
        alt=""
        fetchPriority="high"
        loading="eager"
        width={1920}
        height={1080}
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover object-center z-1"
      />

      {/* Video player loaded after page is interactive — no bandwidth competition with LCP */}
      {hlsUrl && <HeroVideoPlayer hlsUrl={hlsUrl} />}

      <div className="video-overlay absolute top-0 left-0 w-full h-full bg-black/30 z-3" />

      <div
        className={`hero-content relative z-10 text-white p-12 mx-auto w-full page-width ${
          isHome ? "text-start flex justify-start" : "text-center flex justify-center"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
