import ClientPage from "./client";
import { getBrands } from "@/services/mainService";

export async function generateStaticParams() {
  try {
    const res = await getBrands();
    return (res?.brands || []).map((brand) => ({
      id: brand.id.toString(),
    }));
  } catch (e) {
    return [];
  }
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
