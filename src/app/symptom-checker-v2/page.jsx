"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import { getSymptomData } from "@/utils/symptomDataHelper";
import BodyDiagram from "@/components/BodyDiagram";
import { useTranslation } from "@/context/LanguageContext";

export default function SymptomCheckerPage() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const getTargetId = (bodyPart) => {
    const mapping = {
      hands: "handsAndFingers",
      lowerLeg: "Lowerlegs",
      ankles: "Ankles",
      hip: "Hips",
      feet: "feet",
      back: "back",
      shoulder: "neckAndShoulder",
      muscles: "Muscles",
      thighs: "thighs",
      knee: "joints",
    };
    return mapping[bodyPart] || "";
  };

  const onBodyPartSelected = (part) => {
    const targetId = getTargetId(part);
    if (targetId) {
      setSelectedAreaId(targetId);
      setVisible(true);
    }
  };

  const closeDrawer = () => {
    setSelectedAreaId(null);
    setVisible(false);
  };

  const symptomData = getSymptomData(t);

  const currentData = selectedAreaId ? symptomData[selectedAreaId] : null;

  return (
    <main className="relative mt-10">
      <div className="relative">
        <BodyDiagram onBodyPartSelected={onBodyPartSelected} />
      </div>

      <Sidebar
        visible={visible}
        onHide={closeDrawer}
        position="right"
        className="w-full md:w-[450px] p-sidebar-lg"
      >
        {currentData && (
          <div className="slideOutContent p-4">
            <div className="painArea text-2xl font-bold text-[#005E99] mb-4 border-b pb-2">
              {currentData.title}
            </div>

            <div className="painAreaInfo text-gray-700 leading-relaxed mb-6">
              <p>{currentData.description}</p>
            </div>

            <div className="productsRow flex flex-col gap-6">
              {currentData.products.map((product, idx) => (
                <div key={idx} className="product border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col gap-4">
                  <div className="name">
                    <Link href={`/product/${product.slug}`} target="_blank" className="block cursor-pointer">
                      <div className="img w-full max-h-[160px] flex items-center justify-center overflow-hidden">
                        <img
                          loading="lazy"
                          src={product.image}
                          className="max-h-[150px] object-contain hover:scale-105 transition-all"
                          alt={product.productName}
                        />
                      </div>
                    </Link>
                    <span className="block text-sm text-gray-500 font-light mt-4">
                      {product.brandName}
                    </span>
                    <Link href={`/product/${product.slug}`} target="_blank" className="text-lg font-semibold text-gray-900 hover:underline hover:text-[#0067B1] transition-colors mt-1 block">
                      {product.productName}
                    </Link>
                  </div>

                  <Link href={`/product/${product.slug}`} target="_blank" className="text-white">
                    <button className="block w-full bg-[#0067B1] hover:bg-[#00348D] text-white py-2.5 rounded-full font-medium transition-all duration-300 cursor-pointer text-center">
                      {t("Single-brand.learnMore")}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Sidebar>

      <div
        className="absolute right-0 bottom-0 w-[30%] h-[80vh] bg-no-repeat bg-cover -z-10 opacity-30 pointer-events-none"
        style={{ backgroundImage: "url(/images/bg-blue.webp)" }}
      ></div>
    </main>
  );
}
