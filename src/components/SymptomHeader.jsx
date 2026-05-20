"use client";
import React from "react";
import { useTranslation } from "@/context/LanguageContext";

export default function SymptomHeader() {
  const { t } = useTranslation();

  return (
    <div className="content w-full lg:w-3/4 mx-auto">
      <div className="my-4">
        <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-[#005E99]">
          {t("symptom.header.title")}
        </h2>
        <p className="text-gray-700">
          {t("symptom.header.description")}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl text-[#EF3E42] my-4 font-bold">
          {t("symptom.header.howToUse.title")}
        </h2>
        <ul className="list-disc list-inside marker:text-[#EF3E42] text-gray-700">
          <li className="mb-2">
            {t("symptom.header.howToUse.steps.click")}
          </li>
          <li className="mb-2">
            {t("symptom.header.howToUse.steps.discover")}
          </li>
        </ul>
      </div>
    </div>
  );
}
