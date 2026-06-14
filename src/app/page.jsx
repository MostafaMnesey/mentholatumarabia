"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    const browserLang = navigator.language?.startsWith("ar") ? "ar" : "en";
    router.replace(`/${saved || browserLang}`);
  }, [router]);

  return null;
}
