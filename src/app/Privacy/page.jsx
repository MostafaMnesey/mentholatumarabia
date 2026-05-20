"use client";
import React from "react";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <main className="relative w-full overflow-hidden">
      <HeroBackground
        bgImage="https://cdn.mentholatumarabia.com/web/8c7143aa7df9b388214a669834ec8bf0d5940e74.webp"
        isHome={false}
      >
        <h1 className="w-[80%] md:w-[45%] mx-auto text-white text-2xl md:text-3xl lg:text-5xl font-bold text-center leading-normal">
          {t("privacy_policy.title")}
        </h1>
      </HeroBackground>

      <div className="content page-width px-4 container mx-auto py-12">
        <section className="my-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="content text-gray-700 leading-relaxed">
              <h1 className="mb-3 text-2xl font-bold text-gray-900">
                {t("privacy_policy.title")}
              </h1>
              <p className="mb-4 text-[#0067B1] font-semibold text-lg">
                {t("privacy_policy.subtitle")}
              </p>

              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {t("privacy_policy.introduction.title")}
              </h3>
              <p className="mb-4 text-gray-600">
                {t("privacy_policy.introduction.description")}
              </p>

              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {t("privacy_policy.data_privacy.title")}
              </h3>
              <p className="mb-4 text-gray-600">
                {t("privacy_policy.data_privacy.description")}
              </p>
            </div>
            <div className="img flex justify-center md:justify-end -order-1 md:order-none">
              <img
                loading="lazy"
                className="w-full md:w-3/4 object-contain"
                src="/new/new%20logo.webp"
                alt="Logo"
              />
            </div>
          </div>
        </section>

        <div className="policy-sections grid md:grid-cols-2 gap-x-12 gap-y-8 my-12 text-gray-700">
          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.data_collection.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.data_collection.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.usage.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.usage.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.data_retention.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.data_retention.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.data_sharing.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.data_sharing.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.cookies.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.cookies.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.your_rights.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.your_rights.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.limited_license.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.limited_license.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/elements%20(1).svg" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.policy_updates.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.policy_updates.description")}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-[#0067B1] flex items-center">
              <img loading="lazy" src="/new/new%20logo.webp" className="me-2 w-8 h-8 object-contain" alt="" />
              {t("privacy_policy.enforceability.title")}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("privacy_policy.enforceability.description")}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
