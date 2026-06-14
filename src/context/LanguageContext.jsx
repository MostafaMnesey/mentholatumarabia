"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import en from "../../public/i18n/en.json";
import ar from "../../public/i18n/ar.json";

const LanguageContext = createContext();

const translations = { en, ar };

export function LanguageProvider({ children, lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || "en");
  const [isLangChanging, setIsLangChanging] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (initialLang) {
      setLang(initialLang);
    }
  }, [initialLang]);

  useEffect(() => {
    setIsLangChanging(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;

    if (!localStorage.getItem("geo")) {
      fetch("https://ip-api.com/json?fields=16387")
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            localStorage.setItem("geo", JSON.stringify(data));
          }
        })
        .catch((err) => console.warn("Failed to fetch geo data", err));
    }
  }, [lang]);

  const changeLang = (newLang) => {
    if (newLang === lang) return;
    setIsLangChanging(true);
    localStorage.setItem("lang", newLang);
    const currentPath = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${newLang}${currentPath}`);
  };

  const t = (key) => {
    if (!key) return "";
    const keys = key.split(".");
    let current = translations[lang] || translations.en;
    for (const k of keys) {
      if (current[k] !== undefined) {
        current = current[k];
      } else {
        let fallback = translations.en;
        let found = true;
        for (const fk of keys) {
          if (fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            found = false;
            break;
          }
        }
        return found ? fallback : key;
      }
    }
    return typeof current === "string" || Array.isArray(current) ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t, isLangChanging }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
