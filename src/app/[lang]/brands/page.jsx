import { PAGE_META } from "@/config/pageMeta";
import BrandsClient from "./client";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.brands[lang] ?? PAGE_META.brands.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/brands`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/brands",
        ar: "https://www.mentholatumarabia.com/ar/brands",
      },
    },
  };
}

export default function BrandsPage() {
  return <BrandsClient />;
}
