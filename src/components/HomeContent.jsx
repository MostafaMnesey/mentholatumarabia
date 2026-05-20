"use client";
import React from "react";
import HeroBackground from "./HeroBackground";
import FeaturesSection from "./FeaturesSection";
import BlogsSection from "./BlogsSection";
import VideosSection from "./VideosSection";
import AboutSection from "./AboutSection";
import { useTranslation } from "../context/LanguageContext";

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <main className="mt-8">
      
     <HeroBackground
        hlsUrl="https://cdn.mentholatumarabia.com/videos/Menthalatum-web.mp4"
        bgImage="https://cdn.mentholatumarabia.com/web/home-hero.webp"
        isHome={true}
      >
        <h1 className="text-white text-2xl lg:text-4xl md:text-5xl font-bold uppercase leading-tight">
          {t("home.hero.commitment")} <br />
          <span className="block my-4 text-white">{t("home.hero.betterWorld")}</span>
        </h1>
      </HeroBackground>

      <div className="w-full mx-auto ">
        <FeaturesSection />
      </div>

      <section className="my-9">
        <HeroBackground
          bgImage="https://cdn.mentholatumarabia.com/web/home-df.webp"
        />
      </section>

      <div className="page-width mx-auto px-4">
        <BlogsSection />
      </div>

      <VideosSection />

      <div className="page-width mx-auto px-4">
        <AboutSection />
      </div>
    </main>
  );
}
