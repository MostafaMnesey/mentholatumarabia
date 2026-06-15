import { PAGE_META } from "@/config/pageMeta";
import ContactClient from "./client";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.contact[lang] ?? PAGE_META.contact.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/contact`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/contact",
        ar: "https://www.mentholatumarabia.com/ar/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
