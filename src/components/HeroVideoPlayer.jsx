"use client";
import React, { useEffect, useRef, useState } from "react";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

export default function HeroVideoPlayer({ hlsUrl }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hls;
    const video = videoRef.current;
    if (!video || !hlsUrl || isMobile()) return;

    const initVideo = async () => {
      try {
        if (hlsUrl.toLowerCase().endsWith(".mp4")) {
          video.src = hlsUrl;
        } else {
          const { default: Hls } = await import("hls.js");
          if (Hls.isSupported()) {
            hls = new Hls({ startLevel: -1 });
            hls.loadSource(hlsUrl);
            hls.attachMedia(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = hlsUrl;
          }
        }
      } catch {
        // video unavailable — static image remains visible
      }
    };

    initVideo();
    return () => { if (hls) hls.destroy(); };
  }, [hlsUrl]);

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  return (
    <video
      ref={videoRef}
      className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 z-2 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      onLoadedData={() => setVisible(true)}
      onCanPlay={handleCanPlay}
    />
  );
}
