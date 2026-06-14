import ClientPage from "./client";

// Fallback IDs used when the API is unreachable during build
const FALLBACK_BRAND_IDS = ["23", "24", "25", "26", "27"];

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
      if (i < retries - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  return null;
}

export async function generateStaticParams() {
  const data = await fetchWithRetry("https://dev-api.mentholatumarabia.com/api/website/brands");
  const brands = data?.brands;
  if (!brands || brands.length === 0) {
    return FALLBACK_BRAND_IDS.map((id) => ({ id }));
  }
  return brands.map((brand) => ({ id: brand.id.toString() }));
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
