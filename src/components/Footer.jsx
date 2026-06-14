"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "../context/LanguageContext";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const { t, lang } = useTranslation();
  const currentSocials = {
    youtube: "https://www.youtube.com/@MentholatumArabia",

    pinterest: "https://www.pinterest.com/mentholatumarabia/",

  };

  return (
    <footer className="bg-white border-t-2 border-t-gray-200 pt-4">
      <div className="container px-4 py-8 page-width mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img loading="lazy" src="https://cdn.mentholatumarabia.com/images/imgs/muk_logo.webp" width={1641} height={313} className="mb-4" alt="Mentholatum Logo" />
            <div className="img my-3">
              <img loading="lazy" src="https://cdn.mentholatumarabia.com/images/imgs/pic.webp" className="w-full aspect-auto" alt="Mentholatum Pic" />
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">
              {t("footer.brands.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/brand/23`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.brands.items.deepHeat")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/brand/24`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.brands.items.deepFreeze")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/brand/25`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.brands.items.deepRelief")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/brand/26`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.brands.items.hadaLabo")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/brand/27`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.brands.items.rohto")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">
              {t("footer.mentholatum.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.mentholatum.items.discover")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/shop`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.brands.items.shop")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-gray-600 hover:text-gray-900">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blogs`} className="text-gray-600 hover:text-gray-900">
                  {t("nav.blogs")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/symptom-checker-v2`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.mentholatum.items.symptomChecker")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/dax`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.mentholatum.items.dax")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">
              {t("footer.customerCare.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/terms`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.customerCare.items.terms")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.customerCare.items.contact")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/Privacy`} className="text-gray-600 hover:text-gray-900">
                  {t("footer.customerCare.items.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-y-3">
            <div className="text-center lg:text-start">
              <p className="text-gray-600 text-sm! leading-tight! text-center lg:text-start mb-3">
                {t("footer.bottom.copyright")}
              </p>
            </div>

            <div className="flex gap-6 mt-4 md:mt-0">
              <SocialLinks currentSocials={currentSocials} className="flex items-center gap-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

