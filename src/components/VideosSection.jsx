"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { Carousel } from "primereact/carousel";
import { Play, Eye, X } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function VideosSection() {
  const { t, lang } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const videoCards = [
    {
      imgSrc: "images/video_images/rhoto.webp",
      videoId: "DeAeUs2dDPU",
      titleKey: "home.videosSection.videoCards.card1.title",
      subtitleKey: "home.videosSection.videoCards.card1.subtitle",
      cardIndex: 1,
    },
    {
      imgSrc: "images/video_images/deepheat.webp",
      videoId: "bCpiTHkUHqA",
      titleKey: "home.videosSection.videoCards.card2.title",
      subtitleKey: "home.videosSection.videoCards.card2.subtitle",
      cardIndex: 2,
    },
    {
      imgSrc: "images/video_images/deepfreeze.webp",
      videoId: "UTEjKzhJ0i0",
      titleKey: "home.videosSection.videoCards.card3.title",
      subtitleKey: "home.videosSection.videoCards.card3.subtitle",
      cardIndex: 3,
    },
  ];

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const showVideoDialog = (videoId, cardNumber) => {
    const title = t(`home.videosSection.videoCards.card${cardNumber}.title`);
    setVideoSrc(videoId);
    setVideoTitle(title);
    setVisible(true);
  };

  const itemTemplate = (card) => {
    return (
      <div className="bg-white mx-2 rounded-3xl border border-gray-100 shadow-md p-3 pb-6 text-center group cursor-pointer hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden rounded-2xl aspect-video">
          <img
            loading="lazy"
            src={card.imgSrc}
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
  };

  return (
    <section className="py-20 bg-gray-100 relative w-full overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 opacity-15 pointer-events-none w-[300px]">
        <img loading="lazy" src="images/Vector (7).webp" alt="" className="w-full" />
      </div>

      <div className="hidden lg:block absolute top-0 right-0 opacity-15 pointer-events-none w-[300px]">
        <img loading="lazy" src="images/Vector (8).webp" alt="" className="w-full" />
      </div>

      {/* Desktop view */}
      <div className="page-width hidden lg:block mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {videoCards.map((card, idx) => (
            <motion.div
              key={card.cardIndex}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl border border-gray-150 p-3 pb-6 text-center group cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video shadow-sm">
                <img
                  loading="lazy"
                  src={card.imgSrc}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300"
                  >
                    <Play className="w-7 h-7 text-[#0067B1] fill-[#0067B1] ml-1" />
                  </motion.div>
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="card block lg:hidden page-width mx-auto px-4">
        <Carousel
          value={videoCards}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          showNavigators={false}
          showIndicators={false}
          circular
          autoplayInterval={5000}
          itemTemplate={itemTemplate}
        />
      </div>

      <Dialog
        header={videoTitle}
        visible={visible}
        style={{ width: "90vw", maxWidth: "800px" }}
        onHide={() => {
          setVisible(false);
          setVideoSrc("");
        }}
        modal
        draggable={false}
        resizable={false}
        className="rounded-3xl overflow-hidden"
      >
        <div className="w-full aspect-video relative">
          {videoSrc && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1&modestbranding=1&rel=0`}
              title={videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl shadow-lg border border-gray-100"
            ></iframe>
          )}
        </div>
      </Dialog>
    </section>
  );
}
