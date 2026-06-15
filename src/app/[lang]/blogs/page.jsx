import { PAGE_META } from "@/config/pageMeta";
import BlogsClient from "./client";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.blogs[lang] ?? PAGE_META.blogs.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/blogs`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/blogs",
        ar: "https://www.mentholatumarabia.com/ar/blogs",
      },
    },
  };
}

export default function BlogsPage() {
  return <BlogsClient />;
}
