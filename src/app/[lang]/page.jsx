import React from "react";
import HomeContent from "@/components/HomeContent";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: "Mentholatum - Home",
    description: "Mentholatum - Specialists in family healthcare for over 130 years",
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/",
        ar: "https://www.mentholatumarabia.com/ar/",
        "x-default": "https://www.mentholatumarabia.com/",
      },
    },
  };
}

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
