import ClientPage from "./client";

const BASE_URL = "https://www.mentholatumarabia.com";
const API_BASE = "https://api.mentholatumarabia.com/api/website";

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
  const data = await fetchWithRetry(`${API_BASE}/shop`);
  const slugs = data?.products || [];
  return ["en", "ar"].flatMap((lang) =>
    slugs.map((product) => ({ lang, slug: product.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const data = await fetchWithRetry(`${API_BASE}/products/${slug}`);
  const product = data?.product;

  if (!product) return {};

  const title = `${product.meta_title || product.name} - Mentholatum Arabia`;
  const description = product.meta_description || product.details || product.description || "";
  const canonicalUrl = `${BASE_URL}/${lang}/product/${slug}/`;
  const image = product.main_image || product.thumbnail || product.images?.[0];

  return {
    title,
    description,
    ...(product.meta_keywords && { keywords: product.meta_keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/product/${slug}/`,
        ar: `${BASE_URL}/ar/product/${slug}/`,
        "x-default": `${BASE_URL}/product/${slug}/`,
      },
    },
    openGraph: {
      title: product.meta_title || product.name,
      description,
      type: "website",
      url: canonicalUrl,
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.meta_title || product.name,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
