"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
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

  const symptomData = {
    handsAndFingers: {
      title: t("symptom.pain_relief.hands_and_fingers.title"),
      description: t("symptom.pain_relief.hands_and_fingers.description"),
      products: [
        {
          slug: "deep-freeze-cold-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418192-(10).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.hands_and_fingers.products.deep_freeze_cold_gel.name")
        },
        {
          slug: "deep-relief-anti-inflammatory-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418442-(11).webp",
          brandName: t("footer.brands.items.deepRelief"),
          productName: t("symptom.pain_relief.hands_and_fingers.products.deep_relief_anti_inflammatory_gel.name")
        }
      ]
    },
    Lowerlegs: {
      title: t("symptom.pain_relief.lower_legs.title"),
      description: t("symptom.pain_relief.lower_legs.description"),
      products: [
        {
          slug: "deep-heat-pain-relief-spray",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418036-(1).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.lower_legs.products.deep_heat_pain_relief_spray.name")
        },
        {
          slug: "deep-freeze-cold-spray",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418243-(4).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.lower_legs.products.deep_freeze_cold_spray.name")
        }
      ]
    },
    Ankles: {
      title: t("symptom.pain_relief.ankles.title"),
      description: t("symptom.pain_relief.ankles.description"),
      products: [
        {
          slug: "deep-freeze-cold-patch",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418144-(4)-(1).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.ankles.products.deep_freeze_cold_patch.name")
        }
      ]
    },
    Hips: {
      title: t("symptom.pain_relief.hips.title"),
      description: t("symptom.pain_relief.hips.description"),
      products: [
        {
          slug: "deep-relief-actiflex-patch",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418341-(12)-(1).webp",
          brandName: t("footer.brands.items.deepRelief"),
          productName: t("symptom.pain_relief.hips.products.deep_relief_actiflex_patch.name")
        }
      ]
    },
    feet: {
      title: t("symptom.pain_relief.feet.title"),
      description: t("symptom.pain_relief.hips.description"),
      products: [
        {
          slug: "deep-freeze-cold-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418192-(10).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.feet.products.deep_freeze_cold_gel.name")
        }
      ]
    },
    back: {
      title: t("symptom.pain_relief.back.title"),
      description: t("symptom.pain_relief.back.description"),
      products: [
        {
          slug: "deep-heat-pain-relief-back-patch",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051417595-(2)-(1).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.back.products.deep_heat_pain_relief_back_patch.name")
        },
        {
          slug: "deep-heat-warming-belt",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025062507537-(1).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.back.products.deep_heat_warming_belt.name")
        },
        {
          slug: "deep-relief-anti-inflammatory-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418442-(11).webp",
          brandName: t("footer.brands.items.deepRelief"),
          productName: t("symptom.pain_relief.back.products.deep_relief_anti_inflammatory_gel.name")
        },
        {
          slug: "deep-freeze-cold-patch",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418144-(4)-(1).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.back.products.deep_freeze_cold_patch_back.name")
        }
      ]
    },
    neckAndShoulder: {
      title: t("symptom.pain_relief.neck_and_shoulders.title"),
      description: t("symptom.pain_relief.neck_and_shoulders.description"),
      products: [
        {
          slug: "deep-heat-muscle-massage-roll-on-lotion",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051417303-(3).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.neck_and_shoulders.products.deep_heat_muscle_massage_roll_on.name")
        },
        {
          slug: "deep-heat-pain-relief-heat-patch",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025061810204-(7).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.neck_and_shoulders.products.deep_heat_pain_relief_heat_patch.name")
        }
      ]
    },
    Muscles: {
      title: t("symptom.pain_relief.muscles.title"),
      description: t("symptom.pain_relief.muscles.description"),
      products: [
        {
          slug: "deep-freeze-cold-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418192-(10).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.muscles.products.deep_freeze_cold_gel.name")
        },
        {
          slug: "deep-heat-rub",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051417121-(10).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.muscles.products.deep_heat_heat_rub.name")
        }
      ]
    },
    thighs: {
      title: t("symptom.pain_relief.thighs.title"),
      description: t("symptom.pain_relief.thighs.description"),
      products: [
        {
          slug: "deep-heat-rub",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051417121-(10).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.thighs.products.deep_heat_heat_rub.name")
        },
        {
          slug: "deep-heat-pain-relief-spray",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418036-(1).webp",
          brandName: t("footer.brands.items.deepHeat"),
          productName: t("symptom.pain_relief.thighs.products.deep_heat_pain_relief_spray.name")
        },
        {
          slug: "deep-freeze-cold-spray",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418243-(4).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.thighs.products.deep_freeze_cold_spray.name")
        },
        {
          slug: "deep-freeze-cold-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418192-(10).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.thighs.products.deep_freeze_cold_gel.name")
        }
      ]
    },
    joints: {
      title: t("symptom.pain_relief.joints.title"),
      description: t("symptom.pain_relief.joints.description"),
      products: [
        {
          slug: "deep-freeze-cold-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418192-(10).webp",
          brandName: t("footer.brands.items.deepFreeze"),
          productName: t("symptom.pain_relief.joints.products.deep_freeze_cold_gel.name")
        },
        {
          slug: "deep-relief-anti-inflammatory-gel",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418442-(11).webp",
          brandName: t("footer.brands.items.deepRelief"),
          productName: t("symptom.pain_relief.joints.products.deep_relief_joint_pain_gel.name")
        },
        {
          slug: "deep-relief-actiflex-patch",
          image: "https://www.uat.alpha-360.net/public/uploads/products/2025051418341-(12)-(1).webp",
          brandName: t("footer.brands.items.deepRelief"),
          productName: t("symptom.pain_relief.joints.products.deep_relief_actiflex_patch.name")
        }
      ]
    }
  };

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
