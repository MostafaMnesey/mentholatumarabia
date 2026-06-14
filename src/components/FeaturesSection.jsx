"use client";
import React from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { ClipboardList, Eye, ArrowRight } from "lucide-react";

export default function FeaturesSection() {
  const { t, lang } = useTranslation();

  const tests = [
    {
      icon: <ClipboardList className="w-10 h-10 text-white" />,
      title: "home.features.symptomChecker.title",
      description: "home.features.symptomChecker.description",
      button: "home.features.symptomChecker.buttonText",
      link: `/${lang}/symptom-checker-v2`,
      external: false,
    },
    {
      icon: <Eye className="w-10 h-10 text-white" />,
      title: "home.features.blinkTest.title",
      description: "home.features.blinkTest.description",
      button: "home.features.blinkTest.buttonText",
      link: "https://blinktest.mentholatumarabia.com/",
      external: true,
    },
  ];

  return (
    <section className="py-12 md:py-20 page-width mx-auto" aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">{t("home.features.sectionTitle") || "Our Tools"}</h2>
      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tests.map((test, index) => {
            const isExternal = test.external;
            const content = (
              <m.div
                initial={{ y: 24 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.08)" }}
                className="bg-white/80 backdrop-blur-md border border-gray-150 rounded-3xl p-8 text-center flex flex-col items-center gap-6 cursor-pointer shadow-sm"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <div className="flex justify-center">
                  <m.div
                    whileHover={{ scale: 1.1 }}
                    className="flex justify-center items-center bg-[#0067B1] hover:bg-[#00348D] w-20 h-20 rounded-full shadow-lg shadow-[#0067B1]/20 transition-all duration-300"
                  >
                    {test.icon}
                  </m.div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold my-3 text-gray-800 tracking-tight">
                    {t(test.title)}
                  </h3>
                  <p className="w-5/6 mx-auto text-gray-500 leading-relaxed text-base">
                    {t(test.description)}
                  </p>
                  <div className="my-6">
                    <button className="rounded-full px-8 py-3 border-2 border-[#0067B1] text-[#0067B1] hover:bg-[#0067B1] hover:text-white text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2">
                      <span>{t(test.button)}</span>
                      <ArrowRight className="w-4.5 h-4.5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </m.div>
            );

            return isExternal ? (
              <a key={index} href={test.link} target="_blank" rel="noopener noreferrer" className="block">
                {content}
              </a>
            ) : (
              <Link key={index} href={test.link} className="block">
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col gap-4 md:hidden" dir={lang === "ar" ? "rtl" : "ltr"}>
        {tests.map((test, index) => {
          const cardContent = (
            <div className="flex flex-col items-center justify-between min-h-75 p-6 text-center">
              <div className="flex justify-center items-center w-20 h-20 rounded-full bg-[#0067B1] shadow-lg shadow-[#0067B1]/25 hover:bg-[#00348D] transition-colors duration-300">
                {test.icon}
              </div>
              <div className="flex-1 flex flex-col justify-between mt-4">
                <div>
                  <h3 className="text-xl font-bold my-3 text-gray-800">{t(test.title)}</h3>
                  <p className="w-11/12 mx-auto text-gray-600 leading-relaxed text-sm">{t(test.description)}</p>
                </div>
                <div className="my-5">
                  <span className="rounded-full px-6 py-2.5 bg-[#0067B1] text-white text-sm font-semibold shadow-md inline-flex items-center gap-1.5">
                    <span>{t(test.button)}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          );

          return test.external ? (
            <a key={index} href={test.link} target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-md text-center block">
              {cardContent}
            </a>
          ) : (
            <Link key={index} href={test.link} className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-md text-center block">
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
