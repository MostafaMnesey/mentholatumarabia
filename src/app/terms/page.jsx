"use client";
import React from "react";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <HeroBackground
        bgImage="https://cdn.mentholatumarabia.com/web/8c7143aa7df9b388214a669834ec8bf0d5940e74.webp"
        isHome={false}
      >
        <h1 className="w-[80%] md:w-[45%] mx-auto text-white text-2xl md:text-3xl lg:text-5xl font-bold text-center leading-normal">
          {t("terms_conditions.title")}
        </h1>
      </HeroBackground>

      <div className="content page-width mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="content text-gray-700 leading-relaxed">
            <h1 className="mb-2 font-semibold text-2xl text-gray-900">
              {t("terms_conditions.title")}
            </h1>
            <h2 className="mb-4 text-lg font-medium text-gray-800">
              {t("terms_conditions.subtitle")}
            </h2>
            <p className="text-gray-600">
              {t("terms_conditions.description")}
            </p>
          </div>

          <div className="img flex justify-center md:justify-end -order-1 md:order-none">
            <img
              loading="lazy"
              className="w-full md:w-3/4 object-contain"
              src="https://cdn.mentholatumarabia.com/images/imgs/new%20logo.webp"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
