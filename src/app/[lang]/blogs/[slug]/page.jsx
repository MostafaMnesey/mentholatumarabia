import ClientPage from "./client";

const BASE_URL = "https://www.mentholatumarabia.com";
const API_BASE = "https://dev-api.mentholatumarabia.com/api/website";

const BASE_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function fetchWithRetry(url, lang = "en", retries = 3) {
  const headers = { ...BASE_HEADERS, "Accept-Language": lang };
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i < retries - 1) await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  return null;
}

export async function generateStaticParams() {
  // Fetch slugs for both languages — Arabic and English may have different slugs
  const [enData, arData] = await Promise.all([
    fetchWithRetry(`${API_BASE}/blogs`, "en"),
    fetchWithRetry(`${API_BASE}/blogs`, "ar"),
  ]);

  const enSlugs = (enData?.blogs?.data || []).map((b) => b.slug);
  const arSlugs = (arData?.blogs?.data || []).map((b) => b.slug);
  const allSlugs = [...new Set([...enSlugs, ...arSlugs])];

  // Return only `slug` — parent [lang]/layout.js provides the `lang` dimension
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const data = await fetchWithRetry(`${API_BASE}/blogs/${slug}`, lang);
  const blog = data?.blog;

  if (!blog) return {};

  const title = `${blog.meta_title || blog.title} - Mentholatum Arabia`;
  const description = blog.meta_description || blog.excerpt || "";
  const canonicalUrl = `${BASE_URL}/${lang}/blogs/${slug}/`;
  const image = blog.image || blog.thumbnail;

  return {
    title,
    description,
    ...(blog.meta_keywords && { keywords: blog.meta_keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/blogs/${slug}/`,
        ar: `${BASE_URL}/ar/blogs/${slug}/`,
        "x-default": `${BASE_URL}/blogs/${slug}/`,
      },
    },
    openGraph: {
      title: blog.meta_title || blog.title,
      description,
      type: "article",
      url: canonicalUrl,
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.meta_title || blog.title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
