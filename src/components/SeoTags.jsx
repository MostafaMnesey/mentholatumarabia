"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BASE_URL = "https://www.mentholatumarabia.com";

export default function SeoTags() {
  const pathname = usePathname();

  useEffect(() => {
    const normalizedPath =
      pathname === "/" ? "/" : pathname.replace(/\/?$/, "/");
    const pageUrl = `${BASE_URL}${normalizedPath}`;

    const setLink = (selector, attributes) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("link");
        Object.entries(attributes).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      } else {
        el.setAttribute("href", pageUrl);
      }
    };

    setLink('link[rel="canonical"]', { rel: "canonical", href: pageUrl });
    setLink('link[hreflang="en"]', {
      rel: "alternate",
      hreflang: "en",
      href: pageUrl,
    });
    setLink('link[hreflang="ar"]', {
      rel: "alternate",
      hreflang: "ar",
      href: pageUrl,
    });
    setLink('link[hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: pageUrl,
    });
  }, [pathname]);

  return null;
}
