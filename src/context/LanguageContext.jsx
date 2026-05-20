"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../../public/i18n/en.json";
import ar from "../../public/i18n/ar.json";

const LanguageContext = createContext();

const translations = { en, ar };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";
    setLang(storedLang);
    document.documentElement.dir = storedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = storedLang;

    // Fetch and cache geo data if not already present
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
  }, []);

  const changeLang = (newLang) => {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    window.location.reload();
  };

  const t = (key) => {
    if (!key) return "";
    const keys = key.split(".");
    let current = translations[lang] || translations.en;
    for (const k of keys) {
      if (current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English
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
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
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
