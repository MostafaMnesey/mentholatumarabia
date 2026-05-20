import ClientPage from "./client";
import { shopByBrand } from "@/services/mainService";

export async function generateStaticParams() {
  try {
    const res = await shopByBrand();
    return (res?.products || []).map((product) => ({
      slug: product.slug,
    }));
  } catch (e) {
    return [];
  }
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
