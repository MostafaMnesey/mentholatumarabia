"use client";
import React from "react";
import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";

export default function BrandsPage() {
  const { t, lang } = useTranslation();

  return (
    <div className="w-full">
      <section className="mt-8">
        <HeroBackground
        hlsUrl="https://cdn.mentholatumarabia.com/videos/Menthalatum-web.mp4"
         
          bgImage="https://cdn.mentholatumarabia.com/web/brands-hero.webp"
          isHome={false}
        >
    
        </HeroBackground>
      </section>

      <main className="w-full page-width mx-auto px-4">
        <section className="mx-auto py-14">
          <div className="grid gap-16">
            
            {/* Product Item 1: Deep Heat */}
            <div className="group flex flex-col lg:flex-row items-center justify-between gap-8 bg-transparent p-8 transition-all duration-500 hover:-translate-y-2">
              <div className="w-full lg:w-[50%] aspect-[29/15] rounded-2xl overflow-hidden order-1 shadow-md">
                <img
                  loading="lazy"
                  src="https://cdn.mentholatumarabia.com/images/imgs/deep%20heat2.webp"
                  alt="Deep Heat"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left order-2">
                <h2 className="text-2xl md:text-3xl font-bold pb-2 w-fit text-gray-900 group-hover:text-[#0067B1] transition-colors duration-300">
                  {t("brands.deep_heat.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start leading-relaxed">
                  {t("brands.deep_heat.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start mt-6">
                  <Link href="/shop?brand=deep+heat">
                    <button className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white font-medium rounded-full cursor-pointer transition-all hover:scale-105 shadow hover:shadow-md active:scale-95">
                      {t("brands.deep_heat.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/23">
                    <button className="px-6 py-2.5 border-2 rounded-full text-[#0067B1] font-medium border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all hover:scale-105 shadow-sm hover:shadow-md active:scale-95">
                      {t("brands.deep_heat.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 2: Deep Freeze */}
            <div className="group flex flex-col lg:flex-row items-center justify-between gap-8 bg-transparent p-8 transition-all duration-500 hover:-translate-y-2">
              <div className="w-full lg:w-[50%] aspect-[29/15] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-md">
                <img
                  loading="lazy"
                  src="https://cdn.mentholatumarabia.com/images/imgs/deep%20freeze%202.webp"
                  alt="Deep Freeze"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-2xl md:text-3xl font-bold pb-2 w-fit text-gray-900 group-hover:text-[#0067B1] transition-colors duration-300">
                  {t("brands.deep_freeze.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start leading-relaxed">
                  {t("brands.deep_freeze.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start mt-6">
                  <Link href="/shop?brand=deep+freeze">
                    <button className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white font-medium rounded-full cursor-pointer transition-all hover:scale-105 shadow hover:shadow-md active:scale-95">
                      {t("brands.deep_freeze.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/24">
                    <button className="px-6 py-2.5 border-2 rounded-full text-[#0067B1] font-medium border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all hover:scale-105 shadow-sm hover:shadow-md active:scale-95">
                      {t("brands.deep_freeze.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 3: Deep Relief */}
            <div className="group flex flex-col lg:flex-row items-center justify-between gap-8 bg-transparent p-8 transition-all duration-500 hover:-translate-y-2">
              <div className="w-full lg:w-[50%] aspect-[29/15] rounded-2xl overflow-hidden order-1 shadow-md">
                <img
                  loading="lazy"
                  src="https://cdn.mentholatumarabia.com/images/imgs/deep%20relief2.webp"
                  alt="Deep Relief"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left order-2">
                <h2 className="text-2xl md:text-3xl font-bold pb-2 w-fit text-gray-900 group-hover:text-[#0067B1] transition-colors duration-300">
                  {t("brands.deep_relief.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start leading-relaxed">
                  {t("brands.deep_relief.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start mt-6">
                  <Link href="/shop?brand=deep+relief">
                    <button className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white font-medium rounded-full cursor-pointer transition-all hover:scale-105 shadow hover:shadow-md active:scale-95">
                      {t("brands.deep_relief.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/25">
                    <button className="px-6 py-2.5 border-2 rounded-full text-[#0067B1] font-medium border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all hover:scale-105 shadow-sm hover:shadow-md active:scale-95">
                      {t("brands.deep_relief.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 4: Hada Labo */}
            <div className="group flex flex-col lg:flex-row items-center justify-between gap-8 bg-transparent p-8 transition-all duration-500 hover:-translate-y-2">
              <div className="w-full lg:w-[50%] aspect-[29/15] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-md">
                <img
                  loading="lazy"
                  src="https://cdn.mentholatumarabia.com/images/imgs/hada%20labu%202.webp"
                  alt="Hada Labo Tokyo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-2xl md:text-3xl font-bold pb-2 w-fit text-gray-900 group-hover:text-[#0067B1] transition-colors duration-300">
                  {t("brands.hada_labo.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start leading-relaxed">
                  {t("brands.hada_labo.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start mt-6">
                  <Link href="/shop?brand=hada+labo">
                    <button className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white font-medium rounded-full cursor-pointer transition-all hover:scale-105 shadow hover:shadow-md active:scale-95">
                      {t("brands.hada_labo.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/26">
                    <button className="px-6 py-2.5 border-2 rounded-full text-[#0067B1] font-medium border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all hover:scale-105 shadow-sm hover:shadow-md active:scale-95">
                      {t("brands.hada_labo.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 5: Rohto */}
            <div className="group flex flex-col lg:flex-row items-center justify-between gap-8 bg-transparent p-8 transition-all duration-500 hover:-translate-y-2">
              <div className="w-full lg:w-[50%] aspect-[29/15] rounded-2xl overflow-hidden order-1 shadow-md">
                <img
                  loading="lazy"
                  src="https://cdn.mentholatumarabia.com/images/imgs/rohto2-01.webp"
                  alt="Rohto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left order-2">
                <h2 className="text-2xl md:text-3xl font-bold pb-2 w-fit text-gray-900 group-hover:text-[#0067B1] transition-colors duration-300">
                  {t("brands.rohto.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start leading-relaxed">
                  {t("brands.rohto.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start mt-6">
                  <Link href="/shop?brand=rohto">
                    <button className="px-6 py-2.5 bg-[#0067B1] hover:bg-[#00348D] text-white font-medium rounded-full cursor-pointer transition-all hover:scale-105 shadow hover:shadow-md active:scale-95">
                      {t("brands.rohto.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/27">
                    <button className="px-6 py-2.5 border-2 rounded-full text-[#0067B1] font-medium border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all hover:scale-105 shadow-sm hover:shadow-md active:scale-95">
                      {t("brands.rohto.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
