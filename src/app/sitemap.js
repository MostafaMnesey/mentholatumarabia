export const dynamic = "force-static";

const BASE_URL = "https://www.mentholatumarabia.com";
const API_BASE = "https://dev-api.mentholatumarabia.com/api/website";

async function apiFetch(path, lang) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function entry(url, lastModified, changeFrequency = "weekly", priority = 0.8) {
  return { url, lastModified: lastModified ? new Date(lastModified) : new Date(), changeFrequency, priority };
}

export default async function sitemap() {
  const [enProducts, enBrands, enBlogs, arBlogs] = await Promise.all([
    apiFetch("/shop", "en"),
    apiFetch("/brands", "en"),
    apiFetch("/blogs", "en"),
    apiFetch("/blogs", "ar"),
  ]);

  const products = enProducts?.products || [];
  const brands = enBrands?.brands || [];
  const blogsEn = enBlogs?.blogs?.data || [];
  const blogsAr = arBlogs?.blogs?.data || [];

  const staticPaths = [
    "/", "/brands", "/shop", "/about", "/blogs",
    "/environment", "/contact", "/dax",
    "/symptom-checker-v2", "/terms", "/Privacy",
  ];

  const staticRoutes = staticPaths.flatMap((path) => [
    entry(`${BASE_URL}/en${path}`, null, "weekly", 1.0),
    entry(`${BASE_URL}/ar${path}`, null, "weekly", 1.0),
  ]);

  // Products & brands: slugs/ids are language-independent
  const productRoutes = products.flatMap((p) => [
    entry(`${BASE_URL}/en/product/${p.slug}`, p.updated_at),
    entry(`${BASE_URL}/ar/product/${p.slug}`, p.updated_at),
  ]);

  const brandRoutes = brands.flatMap((b) => [
    entry(`${BASE_URL}/en/brand/${b.id}`, b.updated_at, "monthly", 0.7),
    entry(`${BASE_URL}/ar/brand/${b.id}`, b.updated_at, "monthly", 0.7),
  ]);

  // Blogs: English and Arabic have different slugs — include each correctly
  const enBlogRoutes = blogsEn.map((b) =>
    entry(`${BASE_URL}/en/blogs/${b.slug}`, b.updated_at, "weekly", 0.7)
  );
  const arBlogRoutes = blogsAr.map((b) =>
    entry(`${BASE_URL}/ar/blogs/${b.slug}`, b.updated_at, "weekly", 0.7)
  );

  return [...staticRoutes, ...productRoutes, ...brandRoutes, ...enBlogRoutes, ...arBlogRoutes];
}
