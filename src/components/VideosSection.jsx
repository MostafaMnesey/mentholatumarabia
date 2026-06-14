"use client";
import React, { useState } from "react";
import { m } from "framer-motion";
import { Play, X } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function VideosSection() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const videoCards = [
    {
      imgSrc: "https://cdn.mentholatumarabia.com/images/imgs/rhoto.webp",
      videoId: "DeAeUs2dDPU",
      titleKey: "home.videosSection.videoCards.card1.title",
      subtitleKey: "home.videosSection.videoCards.card1.subtitle",
      cardIndex: 1,
    },
    {
      imgSrc: "https://cdn.mentholatumarabia.com/images/imgs/deepheat.webp",
      videoId: "bCpiTHkUHqA",
      titleKey: "home.videosSection.videoCards.card2.title",
      subtitleKey: "home.videosSection.videoCards.card2.subtitle",
      cardIndex: 2,
    },
    {
      imgSrc: "https://cdn.mentholatumarabia.com/images/imgs/deepfreeze.webp",
      videoId: "UTEjKzhJ0i0",
      titleKey: "home.videosSection.videoCards.card3.title",
      subtitleKey: "home.videosSection.videoCards.card3.subtitle",
      cardIndex: 3,
    },
  ];

  const showVideoDialog = (videoId, cardNumber) => {
    setVideoSrc(videoId);
    setVideoTitle(t(`home.videosSection.videoCards.card${cardNumber}.title`));
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
    setVideoSrc("");
  };

  const VideoCard = ({ card, className = "" }) => (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-md p-3 pb-6 text-center group cursor-pointer hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="relative overflow-hidden rounded-2xl aspect-video">
        <img
          loading="lazy"
          src={card.imgSrc}
          width={800}
          height={450}
          alt="Video Thumbnail"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Play className="w-6 h-6 text-[#0067B1] fill-[#0067B1] ml-0.5" />
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold mt-5 text-gray-900 line-clamp-1">{t(card.titleKey)}</h3>
      <p className="text-gray-500 font-medium text-sm mt-1">{t(card.subtitleKey)}</p>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => showVideoDialog(card.videoId, card.cardIndex)}
          className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{t("home.videosSection.videoCards.watchButton")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-100 relative w-full overflow-hidden">
      <div className="absolute bottom-0 left-0 opacity-15 pointer-events-none w-75">
        <img loading="lazy" src="https://cdn.mentholatumarabia.com/images/imgs/Vector%20(7).webp" alt="" className="w-full" />
      </div>
      <div className="hidden lg:block absolute top-0 right-0 opacity-15 pointer-events-none w-75">
        <img loading="lazy" src="https://cdn.mentholatumarabia.com/images/imgs/Vector%20(8).webp" alt="" className="w-full" />
      </div>

      {/* Desktop grid */}
      <div className="page-width hidden lg:block mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 relative z-10">
          {videoCards.map((card, idx) => (
            <m.div
              key={card.cardIndex}
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-gray-150 p-3 pb-6 text-center group cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video shadow-sm">
                <img
                  loading="lazy"
                  src={card.imgSrc}
                  width={800}
                  height={450}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <m.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-7 h-7 text-[#0067B1] fill-[#0067B1] ml-1" />
                  </m.div>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-5 text-gray-900 group-hover:text-[#0067B1] transition-colors">{t(card.titleKey)}</h3>
              <p className="text-gray-500 font-semibold text-sm mt-1">{t(card.subtitleKey)}</p>
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => showVideoDialog(card.videoId, card.cardIndex)}
                  className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t("home.videosSection.videoCards.watchButton")}</span>
                </button>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Mobile scroll snap */}
      <div className="block lg:hidden page-width mx-auto px-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scrollbar-hide">
          {videoCards.map((card) => (
            <div key={card.cardIndex} className="flex-none w-[85vw] snap-center">
              <VideoCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightweight CSS video modal — no PrimeReact Dialog */}
      {visible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={closeDialog}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-white font-bold text-sm truncate">{videoTitle}</span>
              <button
                onClick={closeDialog}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer shrink-0 ml-3"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1&modestbranding=1&rel=0`}
                title={videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
