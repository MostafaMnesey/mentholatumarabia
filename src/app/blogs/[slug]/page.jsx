import ClientPage from "./client";

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
  const data = await fetchWithRetry("https://dev-api.mentholatumarabia.com/api/website/blogs");
  return (data?.blogs?.data || []).map((blog) => ({ slug: blog.slug }));
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
