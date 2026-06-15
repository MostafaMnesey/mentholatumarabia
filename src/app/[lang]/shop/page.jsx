import { PAGE_META } from "@/config/pageMeta";
import ShopClient from "./client";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.shop[lang] ?? PAGE_META.shop.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/shop`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/shop",
        ar: "https://www.mentholatumarabia.com/ar/shop",
      },
    },
  };
}

export default function ShopPage() {
  return <ShopClient />;
}
