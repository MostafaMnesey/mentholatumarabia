"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";
import { getDashboardBrands } from "@/services/mainService";

export default function BrandsClient() {
  const { t, lang } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardBrands()
      .then((data) => {
        setBrands(Array.isArray(data) ? data : data?.brands ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch brands:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full">
      <section className="mt-8">
        <HeroBackground
          hlsUrl="https://cdn.mentholatumarabia.com/videos/Menthalatum-web.mp4"
          bgImage="https://cdn.mentholatumarabia.com/web/brands-hero.webp"
          isHome={false}
        />
      </section>

      <main className="w-full page-width mx-auto px-4">
        <section className="mx-auto py-14">
          <div className="grid gap-16">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col lg:flex-row items-center gap-8 p-8"
                  >
                    <Skeleton
                      width="50%"
                      height="280px"
                      className="rounded-2xl"
                    />
                    <div className="lg:w-1/2 flex flex-col gap-4">
                      <Skeleton width="60%" height="32px" />
                      <Skeleton width="90%" height="80px" />
                      <div className="flex gap-4">
                        <Skeleton width="120px" height="40px" className="rounded-full" />
                        <Skeleton width="120px" height="40px" className="rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              : brands.map((brand, idx) => {
                  const name = lang === "ar" ? brand.name_ar : brand.name_en;
                  const desc = lang === "ar" ? brand.desc_ar : brand.desc_en;
                  const shopSlug = brand.name_en.toLowerCase();
                  const isEven = idx % 2 === 1;

                  return (
                    <div
                      key={brand.id}
                      className="group flex flex-col lg:flex-row items-center justify-between gap-8 bg-transparent p-8 transition-all duration-500 hover:-translate-y-2"
                    >
                      <div
                        className={`w-full lg:w-[50%] aspect-29/15 rounded-2xl overflow-hidden shadow-md ${
                          isEven ? "order-1 lg:order-2" : "order-1"
                        }`}
                      >
                        <img
                          loading="lazy"
                          src={brand.image}
                          alt={name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div
                        className={`lg:w-1/2 text-center lg:text-start order-2 ${
                          isEven ? "lg:order-1" : ""
                        }`}
                      >
                        <h2 className="text-2xl md:text-3xl font-bold pb-2 w-fit text-gray-900 group-hover:text-[#0067B1] transition-colors duration-300">
                          {name}
                        </h2>
                        <p className="text-gray-600 my-4 leading-relaxed">
                          {desc}
                        </p>
                        <div className="flex gap-4 justify-center lg:justify-start mt-6">
                          <Link href={`/${lang}/shop?brand=${shopSlug}`}>
                            <button className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white font-medium rounded-full cursor-pointer transition-all hover:scale-105 shadow hover:shadow-md active:scale-95">
                              {t("brands.deep_heat.shop_now")}
                            </button>
                          </Link>
                          <Link href={`/${lang}/brand/${brand.id}`}>
                            <button className="px-6 py-2.5 border-2 rounded-full text-[#0067B1] font-medium border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all hover:scale-105 shadow-sm hover:shadow-md active:scale-95">
                              {t("brands.deep_heat.learn_more")}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>
      </main>
    </div>
  );
}
