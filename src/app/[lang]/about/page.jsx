import { PAGE_META } from "@/config/pageMeta";
import AboutClient from "./client";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.about[lang] ?? PAGE_META.about.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/about`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/about",
        ar: "https://www.mentholatumarabia.com/ar/about",
      },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
