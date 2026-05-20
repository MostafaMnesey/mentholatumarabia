import ClientPage from "./client";
import { getBlogs } from "@/services/mainService";

export async function generateStaticParams() {
  try {
    const res = await getBlogs();
    return (res?.blogs?.data || []).map((blog) => ({
      slug: blog.slug,
    }));
  } catch (e) {
    return [];
  }
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
