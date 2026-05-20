"use client";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "framer-motion";
export default function HeroBackground({ hlsUrl, bgImage = "https://cdn.mentholatumarabia.com/web/home-hero.webp", isHome = false, children }) {
  const videoRef = useRef(null);
  
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let hls;
    const video = videoRef.current;
    if (!video || !hlsUrl) return;

    setIsLoading(true);
    setHasError(false);
    setVideoLoaded(false);

    try {
      if (hlsUrl.toLowerCase().endsWith(".mp4")) {
        video.src = hlsUrl;
      } else if (Hls.isSupported()) {
        hls = new Hls({
          startLevel: -1,
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setHasError(true);
            setIsLoading(false);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    } catch (e) {
      setHasError(true);
      setIsLoading(false);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [hlsUrl]);

  const onCanPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center max-h-[50vh] lg:max-h-[70vh] min-h-[400px] ${isLoading && !hasError ? "before:content-[''] before:absolute before:inset-0 before:backdrop-blur-sm before:bg-black/30 before:z-[4]" : ""}`}
      style={{
        height: "95vh"
      }}
    >
      {/* Animated Background Placeholder */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </AnimatePresence>
      {hlsUrl && (
        <video
          ref={videoRef}
          className={`hero-video absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 z-[2] transition-opacity duration-1000 ${videoLoaded && !hasError ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onLoadedData={() => {
            setVideoLoaded(true);
            setIsLoading(false);
          }}
          onCanPlay={onCanPlay}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}
      <div className="video-overlay absolute top-0 left-0 w-full h-full bg-black/30 z-[3]"></div>
      
      <div className={`hero-content relative z-10 text-white p-12 mx-auto w-full page-width ${isHome ? "text-start flex justify-start" : "text-center flex justify-center"}`}>
        {children}
      </div>
      
      {hasError && hlsUrl && (
        <div className="fallback-message absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] text-center text-white bg-red-500/10 p-4 rounded-md border border-white/20">
          <p>Video unavailable - showing image instead</p>
        </div>
      )}
    </div>
  );
}
