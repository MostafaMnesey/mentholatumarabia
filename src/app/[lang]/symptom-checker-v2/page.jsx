import { PAGE_META } from "@/config/pageMeta";
import SymptomCheckerClient from "./client";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META["symptom-checker"][lang] ?? PAGE_META["symptom-checker"].en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/symptom-checker-v2`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/symptom-checker-v2",
        ar: "https://www.mentholatumarabia.com/ar/symptom-checker-v2",
      },
    },
  };
}

export default function SymptomCheckerPage() {
  return <SymptomCheckerClient />;
}
