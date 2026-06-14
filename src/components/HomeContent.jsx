"use client";
import React from "react";
import dynamic from "next/dynamic";
import HeroBackground from "./HeroBackground";
import { useTranslation } from "../context/LanguageContext";

// Code-split JS but keep in static HTML for SEO
const FeaturesSection = dynamic(() => import("./FeaturesSection"));
const AboutSection = dynamic(() => import("./AboutSection"));

// Fully deferred — not needed for initial paint or SEO
const DecorativeHero = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="my-9 w-full h-[50vh] md:h-[70vh] lg:h-[90vh]" />,
});
const BlogsSection = dynamic(() => import("./BlogsSection"), {
  ssr: false,
  loading: () => null,
});
const VideosSection = dynamic(() => import("./VideosSection"), {
  ssr: false,
  loading: () => null,
});

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <main className="mt-8">
      {/* Above fold — always in initial HTML */}
      <HeroBackground
        hlsUrl="https://cdn.mentholatumarabia.com/videos/Menthalatum-web.mp4"
        bgImage="https://cdn.mentholatumarabia.com/images/imgs/home-hero.webp"
        isHome={true}
      >
        <h1 className="text-white text-2xl lg:text-4xl md:text-5xl font-bold uppercase leading-tight">
          {t("home.hero.commitment")} <br />
          <span className="block my-4 text-white">{t("home.hero.betterWorld")}</span>
        </h1>
      </HeroBackground>

      {/* Below fold — code-split JS, content still in static HTML */}
      <div className="w-full mx-auto">
        <FeaturesSection />
      </div>

      {/* Decorative separator — deferred, not in HTML */}
      {/* <section className="my-9">
        <DecorativeHero bgImage="https://cdn.mentholatumarabia.com/web/home-df.webp" />
      </section> */}

      {/* API-driven and interactive — fully deferred */}
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
