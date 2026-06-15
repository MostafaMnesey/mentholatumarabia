# SEO Meta Tags Plan — Language-Aware Per-Page Metadata

## Context

The app uses **Next.js App Router** with a `[lang]` dynamic segment (`en` / `ar`).  
Currently only the Home page has a `generateMetadata` export, but with placeholder text.  
Most pages (`about`, `blogs`, `brands`, `shop`, `contact`, `symptom-checker-v2`) are  
`"use client"` — which means they **cannot** export `generateMetadata` directly.

The existing pattern in the repo already solves this: product, blog-article, and brand detail  
pages all split into a `page.jsx` (Server Component → handles metadata) and a `client.jsx`  
(Client Component → handles interactivity). We will apply the same pattern to every page  
listed in the PDF.

---

## Approach

### Rule
`generateMetadata` must live in a **Server Component** (`page.jsx`).  
Client logic stays in a separate `client.jsx` file.

### Pages that need work

| Route | Current state | Action |
|---|---|---|
| `[lang]/` (Home) | Server Component, placeholder meta | Update metadata only |
| `[lang]/about` | `"use client"` in `page.jsx` | Split into `page.jsx` + `client.jsx` |
| `[lang]/blogs` | `"use client"` in `page.jsx` | Split into `page.jsx` + `client.jsx` |
| `[lang]/brands` | `"use client"` in `page.jsx` | Split into `page.jsx` + `client.jsx` |
| `[lang]/shop` | `"use client"` in `page.jsx` | Split into `page.jsx` + `client.jsx` |
| `[lang]/contact` | `"use client"` in `page.jsx` | Split into `page.jsx` + `client.jsx` |
| `[lang]/symptom-checker-v2` | `"use client"` in `page.jsx` | Split into `page.jsx` + `client.jsx` |

---

## Step-by-Step Implementation

### Step 1 — Create a central SEO config file

**File:** `src/config/pageMeta.js`

A plain object keyed by page slug and language. No framework dependency.

```js
export const PAGE_META = {
  home: {
    en: {
      title: "Mentholatum Arabia | Personal Care & Healthcare Products",
      description:
        "Discover Mentholatum Arabia's trusted personal care and healthcare products, including eye care, skincare, and pain relief solutions for everyday wellness.",
    },
    ar: {
      title: "شركة منتوالتم | حلول الرعاية الصحية والشخصية",
      description:
        "تعرف علي منتجات منتوالتم للعناية الشخصية والصحية، بما في ذلك العناية بالعين والبشرة وتخفيف الألم، مع حلول تناسب احتياجات الأسرة.",
    },
  },
  about: {
    en: {
      title: "About Mentholatum Arabia | Leaders in Personal Healthcare",
      description:
        "Learn about Mentholatum Arabia, a trusted global healthcare brand with over 130 years of experience in personal care, wellness, and innovation.",
    },
    ar: {
      title: "من نحن شركة منثولاتوم لمنتجات الرعاية الصحية والشخصية",
      description:
        "تعرف على منتولاتم العربية، الشركة العالمية في تطوير منتجات العناية الشخصية والصحية، بخبرة تتجاوز 130 عاماً من الجودة.",
    },
  },
  blogs: {
    en: {
      title: "Mentholatum Arabia Blog",
      description:
        "Explore the Mentholatum Arabia Blog for expert articles on health, wellness, skincare, eye care, and personal care to support a healthier lifestyle.",
    },
    ar: {
      title: "مدونة منتوالتم",
      description:
        "تعرف علي مدونة منتوالتم العربية واطلع على مقالات ونصائح حول الصحة والعناية الشخصية والبشرة.",
    },
  },
  brands: {
    en: {
      title: "Mentholatum Brands and Products",
      description:
        "Learn about Mentholatum's global brands, comprehensive solutions for pain relief and skincare.",
    },
    ar: {
      title: "البراندات والمنتجات لشركة منثولاتوم",
      description:
        "تعرف على العلامات التجارية العالمية لشركة منثولاتوم، حلول متكاملة لعلاج الآلام والعناية بالبشرة.",
    },
  },
  shop: {
    en: {
      title: "Mentholatum Arabia Store",
      description:
        "Shop directly from Mentholatum Arabia official store for authentic skincare and pain relief products with fast, secure delivery to your doorstep.",
    },
    ar: {
      title: "متجر منثولاتوم — تسوق لأهم المنتجات",
      description:
        "تسوق الآن من متجر منثولاتوم حيث نوفر لك مجموعة من منتجات العناية بالبشرة وتسكين الآلام.",
    },
  },
  contact: {
    en: {
      title: "Contact Us - Mentholatum",
      description:
        "Have questions or inquiries? Contact the Mentholatum Arabia support team today. We are always ready to assist you and provide the information you need.",
    },
    ar: {
      title: "تواصل معنا — شركة منثولاتوم",
      description:
        "هل لديك أي استفسار أو اقتراح؟ يسعدنا تواصلك مع فريق منثولاتوم، نحن هنا للإجابة على أسئلتك وتقديم المساعدة التي تحتاجها في أي وقت.",
    },
  },
  "symptom-checker": {
    en: {
      title: "Smart Symptom Checker Tool | Mentholatum Arabia",
      description:
        "Use Mentholatum Arabia's free, advanced Symptom Checker tool to analyze your health symptoms accurately and get the right guidance for your immediate care.",
    },
    ar: {
      title: "أداة تشخيص الأعراض من منثولاتوم",
      description:
        "استخدم أداة تشخيص الأعراض المجانية والمتطورة من منثولاتوم لتحديد حالتك الصحية بدقة والحصول على التوجيهات المناسبة لرعايتك الصحية الفورية.",
    },
  },
};
```

---

### Step 2 — Update Home page metadata

**File:** `src/app/[lang]/page.jsx`

No structural change needed (already a Server Component). Just replace the hardcoded  
title/description with values from `PAGE_META`.

```js
import { PAGE_META } from "@/config/pageMeta";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.home[lang] ?? PAGE_META.home.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/",
        ar: "https://www.mentholatumarabia.com/ar/",
        "x-default": "https://www.mentholatumarabia.com/",
      },
    },
  };
}
```

---

### Step 3 — Split each client page into page.jsx + client.jsx

The pattern for every remaining page is identical:

**`page.jsx` (Server Component — new version)**
```js
import { PAGE_META } from "@/config/pageMeta";
import AboutClient from "./client";   // renamed from page.jsx content

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = PAGE_META.about[lang] ?? PAGE_META.about.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.mentholatumarabia.com/${lang}/about`,
      languages: {
        en: "https://www.mentholatumarabia.com/en/about",
        ar: "https://www.mentholatumarabia.com/ar/about",
      },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
```

**`client.jsx` (moved content)**  
The existing `page.jsx` content (with its `"use client"` directive) is moved verbatim  
into `client.jsx`. The default export is renamed to match the import above  
(e.g. `AboutClient`, `BlogsClient`, etc.).

#### Pages to split this way

| page.jsx route | client.jsx export name | PAGE_META key | canonical path |
|---|---|---|---|
| `about/page.jsx` | `AboutClient` | `about` | `/{lang}/about` |
| `blogs/page.jsx` | `BlogsClient` | `blogs` | `/{lang}/blogs` |
| `brands/page.jsx` | `BrandsClient` | `brands` | `/{lang}/brands` |
| `shop/page.jsx` | `ShopClient` | `shop` | `/{lang}/shop` |
| `contact/page.jsx` | `ContactClient` | `contact` | `/{lang}/contact` |
| `symptom-checker-v2/page.jsx` | `SymptomCheckerClient` | `symptom-checker` | `/{lang}/symptom-checker-v2` |

> **Note:** `blogs/[slug]`, `brand/[id]`, and `product/[slug]` already use the  
> `page.jsx` + `client.jsx` split — no changes needed there.

---

## What does NOT change

- All client-side component logic, hooks, and JSX stay untouched.
- The `[lang]/layout.js` is untouched.
- The existing `seoHelper.js` utility is not used (it is a client-side DOM helper for  
  schema injection; `generateMetadata` handles `<title>` and `<meta>` at the server level).
- No i18n translation files need to be updated — the meta copy lives in `pageMeta.js`.

---

## File change summary

| Action | File |
|---|---|
| **Create** | `src/config/pageMeta.js` |
| **Edit** | `src/app/[lang]/page.jsx` — update metadata values |
| **Edit → page.jsx** | `src/app/[lang]/about/page.jsx` — Server Component wrapper |
| **Create** | `src/app/[lang]/about/client.jsx` — moved client logic |
| **Edit → page.jsx** | `src/app/[lang]/blogs/page.jsx` |
| **Create** | `src/app/[lang]/blogs/client.jsx` |
| **Edit → page.jsx** | `src/app/[lang]/brands/page.jsx` |
| **Create** | `src/app/[lang]/brands/client.jsx` |
| **Edit → page.jsx** | `src/app/[lang]/shop/page.jsx` |
| **Create** | `src/app/[lang]/shop/client.jsx` |
| **Edit → page.jsx** | `src/app/[lang]/contact/page.jsx` |
| **Create** | `src/app/[lang]/contact/client.jsx` |
| **Edit → page.jsx** | `src/app/[lang]/symptom-checker-v2/page.jsx` |
| **Create** | `src/app/[lang]/symptom-checker-v2/client.jsx` |

**Total: 1 new config file + 6 server wrappers edited + 6 new client files = 13 file touches.**


