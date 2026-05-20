"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function AboutSection() {
  const { t, lang } = useTranslation();

  return (
    <section className="py-16 md:py-24 page-width mx-auto px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-start"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1 w-8 bg-[#EA0029] rounded-full"></span>
              <span className="text-[#EA0029] font-extrabold text-sm uppercase tracking-wider">
                {t("home.videosSection.about.sectionTitle")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
              {t("home.videosSection.about.mainHeading")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                {t("home.videosSection.about.mainHeadingHighlight")}
              </span>
            </h2>
            <div className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              <p>{t("home.videosSection.about.description")}</p>
            </div>
            <Link href="/about" className="block w-fit">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0067B1] hover:bg-[#00348D] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md shadow-[#0067B1]/10 hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>{t("home.videosSection.about.discoverMore")}</span>
                <ArrowRight className="w-4.5 h-4.5 rtl:rotate-180" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full sm:w-4/5 lg:w-[42%] flex justify-center rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group aspect-[4/3] lg:aspect-[1.1]"
          >
            <img
              loading="lazy"
              src="images/home/2 (2).webp"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="About section image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
