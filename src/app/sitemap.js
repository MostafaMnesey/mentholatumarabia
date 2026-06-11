export const dynamic = "force-static";

const BASE_URL = "https://www.mentholatumarabia.com";

const API_BASE = "https://dev-api.mentholatumarabia.com/api/website";

const API_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Accept-Language": "en",
};

async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/shop`, { headers: API_HEADERS });
    const data = await res.json();
    return data?.products || [];
  } catch {
    return [];
  }
}

async function fetchBrands() {
  try {
    const res = await fetch(`${API_BASE}/brands`, { headers: API_HEADERS });
    const data = await res.json();
    return data?.brands || [];
  } catch {
    return [];
  }
}

async function fetchBlogs() {
  try {
    const res = await fetch(`${API_BASE}/blogs`, { headers: API_HEADERS });
    const data = await res.json();
    return data?.blogs?.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const [products, brands, blogs] = await Promise.all([
    fetchProducts(),
    fetchBrands(),
    fetchBlogs(),
  ]);

  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/brands`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/environment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/dax`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/symptom-checker-v2`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/Privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const brandRoutes = brands.map((brand) => ({
    url: `${BASE_URL}/brand/${brand.id}`,
    lastModified: brand.updated_at ? new Date(brand.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...brandRoutes, ...blogRoutes];
}
