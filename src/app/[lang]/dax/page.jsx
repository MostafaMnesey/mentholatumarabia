"use client";
import React from "react";
import { useTranslation } from "@/context/LanguageContext";

export default function DaxCosmeticsPage() {
  const { t } = useTranslation();

  return (
    <main className="relative my-10">
      <div className="grid md:grid-cols-2 gap-y-6 page-width mx-auto px-4 py-5 items-center container">
        <div className="content text-gray-700 leading-relaxed">
          <h1 className="mb-3 font-semibold text-3xl text-[#0067B1]">
            {t("dax_cosmetics.title")}
          </h1>
          <h2 className="mb-4 text-lg text-[#00223B] font-medium">
            {t("dax_cosmetics.subtitle")}
          </h2>
          <p className="mb-3">{t("dax_cosmetics.paragraph1")}</p>
          <p className="mb-3">{t("dax_cosmetics.paragraph2")}</p>
          <p className="mb-3">{t("dax_cosmetics.paragraph3")}</p>
        </div>

        <div className="img flex justify-end">
          <img
            loading="lazy"
            className="w-full md:w-3/4 object-contain"
            src="https://cdn.mentholatumarabia.com/images/imgs/new%20logo.webp"
            alt="Dax Cosmetics Logo"
          />
        </div>
      </div>
    </main>
  );
}
