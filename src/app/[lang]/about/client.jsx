"use client";
import React from "react";
import { Timeline } from "primereact/timeline";
import HeroBackground from "@/components/HeroBackground";
import BlogsSection from "@/components/BlogsSection";
import { useTranslation } from "@/context/LanguageContext";

export default function AboutClient() {
  const { t, lang } = useTranslation();

  const events = [
    {
      h: t("about.ourPhilosophy.events.supportingSociety.title"),
      icon: "https://cdn.mentholatumarabia.com/images/imgs/s1.webp",
      p: t("about.ourPhilosophy.events.supportingSociety.description"),
    },
    {
      h: t("about.ourPhilosophy.events.trustAndRespect.title"),
      icon: "https://cdn.mentholatumarabia.com/images/imgs/s2.webp",
      p: t("about.ourPhilosophy.events.trustAndRespect.description"),
    },
    {
      h: t("about.ourPhilosophy.events.happyCustomers.title"),
      icon: "https://cdn.mentholatumarabia.com/images/imgs/costumer.webp",
      p: t("about.ourPhilosophy.events.happyCustomers.description"),
    },
    {
      h: t("about.ourPhilosophy.events.ourPeople.title"),
      icon: "https://cdn.mentholatumarabia.com/images/imgs/social-justice.webp",
      p: t("about.ourPhilosophy.events.ourPeople.description"),
    },
    {
      h: t("about.ourPhilosophy.events.meaningfulExistence.title"),
      icon: "https://cdn.mentholatumarabia.com/images/imgs/community%201.webp",
      p: t("about.ourPhilosophy.events.meaningfulExistence.description"),
    },
    {
      h: t("about.ourPhilosophy.events.continuousImprovement.title"),
      icon: "https://cdn.mentholatumarabia.com/images/imgs/efficacy%201.webp",
      p: t("about.ourPhilosophy.events.continuousImprovement.description"),
    },
    {
      h: t("about.ourPhilosophy.events.relentlessPassion.title"),
      icon: "https://cdn.mentholatumarabia.com/images/imgs/love.webp",
      p: t("about.ourPhilosophy.events.relentlessPassion.description"),
    },
  ];

  const markerTemplate = (event) => {
    return (
      <span className="flex w-20 h-20 items-center justify-center rounded-full z-10 shadow-sm bg-white">
        <img loading="lazy" src={event.icon} className="w-12 h-12 object-contain" alt="" />
      </span>
    );
  };

  const contentTemplate = (event) => {
    return (
      <div className="my-5 px-4">
        <h2 className="mb-3 text-xl font-bold text-black">{event.h}</h2>
        <p className="mb-3 text-gray-700">{event.p}</p>
      </div>
    );
  };

  return (
    <div className="w-full">
      <HeroBackground bgImage="https://cdn.mentholatumarabia.com/web/about-banner.webp" isHome={false}>
        <h1 className="w-[45%] mx-auto container text-white text-2xl md:text-3xl lg:text-5xl font-bold text-center leading-normal">
          {t("about.heroTitle")}
        </h1>
      </HeroBackground>

      <main className="w-full mx-auto px-4">
        {/* Who We Are Section */}
        <section className="my-8 py-10 relative">
          <div className="mx-auto page-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-red-500 font-semibold mb-2 flex items-center">
                  <span className="block h-0.5 w-6 bg-red-500 me-2"></span>
                  {t("about.whoWeAre.sectionTitle")}
                </h2>
                <p className="text-xl md:text-3xl lg:text-4xl mb-3 font-bold capitalize leading-normal md:leading-none w-[80%] text-gray-900">
                  {t("about.whoWeAre.mainHeading")}
                </p>
              </div>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">{t("about.whoWeAre.paragraph1")}</p>
                <p className="mb-4">{t("about.whoWeAre.paragraph2")}</p>
                <p className="mb-4">{t("about.whoWeAre.paragraph3")}</p>
              </div>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.mentholatumarabia.com/images/imgs/Vector%20(10).webp"
            className="absolute z-0 w-96 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
            alt=""
          />
        </section>

        {/* History Section */}
        <section className="bg-[#F6F6F6] my-8 py-10">
          <div className="mx-auto page-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
              <div>
                <h2 className="text-red-500 font-semibold mb-2 flex items-center">
                  <span className="block h-0.5 w-6 bg-red-500 me-2"></span>
                  {t("about.ourHistory.sectionTitle")}
                </h2>
                <p className="text-3xl my-5 font-bold text-gray-900">
                  {t("about.ourHistory.mainHeading")}
                </p>
                <p className="font-semibold my-2 text-gray-800">
                  {t("about.ourHistory.mentholatumHistory")}
                </p>
                <p className="font-semibold my-5 text-gray-800">
                  {t("about.ourHistory.rohtoHistory")}
                </p>
              </div>
              <div className="flex justify-center lg:justify-end order-first lg:order-none">
                <img loading="lazy" src="https://cdn.mentholatumarabia.com/images/imgs/new%20logo.webp" className="w-full md:w-3/4" alt="Mentholatum Logo" />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="my-8 py-10 text-[#003DA6] relative overflow-hidden">
          <div className="page-width mx-auto">
            <h2 className="mb-8 text-center font-bold text-3xl">
              {t("about.ourPhilosophy.sectionTitle")}
            </h2>
            <div className="grid lg:grid-cols-2 items-center justify-between mx-auto px-4 gap-8">
              <div className="w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
                <div className="w-full time-line">
                  <Timeline
                    value={events}
                    align={lang === "ar" ? "right" : "left"}
                    marker={markerTemplate}
                    content={contentTemplate}
                    className="customized-timeline"
                  />
                </div>
              </div>

              <div className="w-full relative z-10 lg:mt-0 flex justify-center lg:justify-end order-first lg:order-none">
                <img
                  loading="lazy"
                  src="https://cdn.mentholatumarabia.com/images/imgs/3%20(2).webp"
                  className="w-full lg:w-[80%] shadow rounded-lg"
                  alt="Our Philosophy - Mentholatum Arabia"
                />
              </div>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.mentholatumarabia.com/images/imgs/Vector%20(11).webp"
            className="absolute top-1/2 -translate-y-1/2 right-0 w-1/6 opacity-20 pointer-events-none"
            alt=""
          />
        </section>

        {/* Blogs Section */}
        <BlogsSection />
      </main>
    </div>
  );
}
