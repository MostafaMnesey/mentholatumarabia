import ClientPage from "./client";

const BASE_URL = "https://www.mentholatumarabia.com";
const API_BASE = "https://dev-api.mentholatumarabia.com/api/website";

const API_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Accept-Language": "en",
};

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: API_HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i < retries - 1) await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  return null;
}

export async function generateStaticParams() {
  const data = await fetchWithRetry(`${API_BASE}/blogs`);
  return (data?.blogs?.data || []).map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await fetchWithRetry(`${API_BASE}/blogs/${slug}`);
  const blog = data?.blog;

  if (!blog) return {};

  const title = `${blog.meta_title || blog.title} - Mentholatum Arabia`;
  const description = blog.meta_description || blog.excerpt || "";
  const canonicalUrl = `${BASE_URL}/blogs/${slug}/`;
  const image = blog.image || blog.thumbnail;

  return {
    title,
    description,
    ...(blog.meta_keywords && { keywords: blog.meta_keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        ar: canonicalUrl,
        "x-default": canonicalUrl,
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
