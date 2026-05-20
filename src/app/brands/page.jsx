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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6">
              <img
                loading="lazy"
                src="/new/deep heat2.webp"
                alt="Deep Heat"
                className="w-full lg:w-[50%] aspect-[29/15] rounded-md order-1"
              />
              <div className="lg:w-1/2 text-center lg:text-left order-2">
                <h2 className="text-2xl font-bold pb-2 w-fit text-gray-900">
                  {t("brands.deep_heat.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start">
                  {t("brands.deep_heat.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <Link href="/shop?brand=deep+heat">
                    <button className="px-4 py-2 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full cursor-pointer transition-all">
                      {t("brands.deep_heat.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/23">
                    <button className="px-4 py-2 border rounded-full text-[#0067B1] border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all">
                      {t("brands.deep_heat.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 2: Deep Freeze */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6">
              <img
                loading="lazy"
                src="/new/deep freeze 2.webp"
                alt="Deep Freeze"
                className="w-full lg:w-[50%] aspect-[29/15] rounded-md order-1 lg:order-2"
              />
              <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-2xl font-bold pb-2 w-fit text-gray-900">
                  {t("brands.deep_freeze.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start">
                  {t("brands.deep_freeze.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <Link href="/shop?brand=deep+freeze">
                    <button className="px-4 py-2 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full cursor-pointer transition-all">
                      {t("brands.deep_freeze.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/24">
                    <button className="px-4 py-2 border rounded-full text-[#0067B1] border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all">
                      {t("brands.deep_freeze.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 3: Deep Relief */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6">
              <img
                loading="lazy"
                src="/new/deep relief2.webp"
                alt="Deep Relief"
                className="w-full lg:w-[50%] aspect-[29/15] rounded-md order-1"
              />
              <div className="lg:w-1/2 text-center lg:text-left order-2">
                <h2 className="text-2xl font-bold pb-2 w-fit text-gray-900">
                  {t("brands.deep_relief.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start">
                  {t("brands.deep_relief.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <Link href="/shop?brand=deep+relief">
                    <button className="px-4 py-2 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full cursor-pointer transition-all">
                      {t("brands.deep_relief.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/25">
                    <button className="px-4 py-2 border rounded-full text-[#0067B1] border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all">
                      {t("brands.deep_relief.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 4: Hada Labo */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6">
              <img
                loading="lazy"
                src="/new/hada labu 2.webp"
                alt="Hada Labo Tokyo"
                className="w-full lg:w-[50%] aspect-[29/15] rounded-md order-1 lg:order-2"
              />
              <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-2xl font-bold pb-2 w-fit text-gray-900">
                  {t("brands.hada_labo.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start">
                  {t("brands.hada_labo.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <Link href="/shop?brand=hada+labo">
                    <button className="px-4 py-2 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full cursor-pointer transition-all">
                      {t("brands.hada_labo.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/26">
                    <button className="px-4 py-2 border rounded-full text-[#0067B1] border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all">
                      {t("brands.hada_labo.learn_more")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Item 5: Rohto */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6">
              <img
                loading="lazy"
                src="/new/rohto2-01.webp"
                alt="Rohto"
                className="w-full lg:w-[50%] aspect-[29/15] rounded-md order-1"
              />
              <div className="lg:w-1/2 text-center lg:text-left order-2">
                <h2 className="text-2xl font-bold pb-2 w-fit text-gray-900">
                  {t("brands.rohto.title")}
                </h2>
                <p className="text-gray-600 my-4 text-start">
                  {t("brands.rohto.description")}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <Link href="/shop?brand=rohto">
                    <button className="px-4 py-2 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full cursor-pointer transition-all">
                      {t("brands.rohto.shop_now")}
                    </button>
                  </Link>
                  <Link href="/brand/27">
                    <button className="px-4 py-2 border rounded-full text-[#0067B1] border-[#0067B1] cursor-pointer hover:bg-[#0067B1] hover:text-white transition-all">
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
