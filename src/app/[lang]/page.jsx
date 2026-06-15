import React from "react";
import HomeContent from "@/components/HomeContent";
import { PAGE_META } from "@/config/pageMeta";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.home[lang] ?? PAGE_META.home.en;
  return {
    title: meta.title,
    description: meta.description,
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
