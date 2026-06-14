import React from "react";
import HomeContent from "@/components/HomeContent";

export const metadata = {
  title: "Mentholatum - Home",
  description:
    "Mentholatum - Specialists in family healthcare for over 130 years",
  alternates: {
    canonical: "https://www.mentholatumarabia.com/",
    languages: {
      en: "https://www.mentholatumarabia.com/",
      ar: "https://www.mentholatumarabia.com/",
      "x-default": "https://www.mentholatumarabia.com/",
    },
  },
};

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://cdn.mentholatumarabia.com/web/home-hero.webp"
        fetchPriority="high"
      />
      <main>
        <HomeContent />
      </main>
    </>
  );
}
