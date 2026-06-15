# i18n URL Migration Plan — `/en` & `/ar` Route Prefixes

## Goal

Move from localStorage-based language detection to URL-based language routing for SEO:

| Before | After |
|---|---|
| `mentholatumarabia.com/about` | `mentholatumarabia.com/en/about` |
| `mentholatumarabia.com/brands` | `mentholatumarabia.com/ar/brands` |
| Language stored in `localStorage` | Language encoded in the URL |
| Both languages share one URL (broken SEO) | Each language has its own URL (correct SEO) |

---

## Constraints

- **Static export** (`output: "export"` in `next.config.mjs`) — Next.js middleware does NOT work in static mode, so the standard middleware-based i18n approach is off the table.
- **No new libraries required** — the existing custom `LanguageContext` is adapted, not replaced.
- **Two languages**: `en` (English, LTR) and `ar` (Arabic, RTL).

---

## Architecture

Use a `[lang]` dynamic route segment at the top of the App Router tree. Next.js `generateStaticParams` pre-builds both language variants of every page at build time.

```
src/app/
├── page.jsx                        ← Root redirect (/ → /en or /ar)
└── [lang]/
    ├── layout.js                   ← Language-aware layout (reads params.lang)
    ├── page.jsx                    ← Home
    ├── about/page.jsx
    ├── brands/page.jsx
    ├── brand/[id]/page.jsx
    ├── product/[slug]/page.jsx
    ├── blogs/
    │   ├── page.jsx
    │   └── [slug]/page.jsx
    ├── shop/page.jsx
    ├── contact/page.jsx
    ├── environment/page.jsx
    ├── dax/page.jsx
    ├── terms/page.jsx
    ├── Privacy/page.jsx
    └── symptom-checker-v2/page.jsx
```

**Static output produced:**
```
out/
├── en/
│   ├── index.html
│   ├── about/index.html
│   ├── brands/index.html
│   └── ...
└── ar/
    ├── index.html
    ├── about/index.html
    ├── brands/index.html
    └── ...
```

---

## Phases

### Phase 1 — Restructure Routes

**What:** Move all pages from `src/app/` into `src/app/[lang]/`.

**Files to move:**
- `src/app/page.jsx` → `src/app/[lang]/page.jsx`
- `src/app/about/page.jsx` → `src/app/[lang]/about/page.jsx`
- `src/app/brands/page.jsx` → `src/app/[lang]/brands/page.jsx`
- `src/app/brand/[id]/page.jsx` → `src/app/[lang]/brand/[id]/page.jsx`
- `src/app/product/[slug]/page.jsx` → `src/app/[lang]/product/[slug]/page.jsx`
- `src/app/blogs/page.jsx` → `src/app/[lang]/blogs/page.jsx`
- `src/app/blogs/[slug]/page.jsx` → `src/app/[lang]/blogs/[slug]/page.jsx`
- `src/app/shop/page.jsx` → `src/app/[lang]/shop/page.jsx`
- `src/app/contact/page.jsx` → `src/app/[lang]/contact/page.jsx`
- `src/app/environment/page.jsx` → `src/app/[lang]/environment/page.jsx`
- `src/app/dax/page.jsx` → `src/app/[lang]/dax/page.jsx`
- `src/app/terms/page.jsx` → `src/app/[lang]/terms/page.jsx`
- `src/app/Privacy/page.jsx` → `src/app/[lang]/Privacy/page.jsx`
- `src/app/symptom-checker-v2/page.jsx` → `src/app/[lang]/symptom-checker-v2/page.jsx`

**Create** `src/app/[lang]/layout.js`:

```js
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default function LangLayout({ children, params }) {
  const { lang } = params;
  return (
    <LanguageProvider lang={lang}>
      {children}
    </LanguageProvider>
  );
}
```

For dynamic routes with their own `generateStaticParams` (product/[slug], brand/[id], blogs/[slug]), the params must include `lang`:

```js
// Before
export async function generateStaticParams() {
  return slugs.map(slug => ({ slug }));
}

// After
export async function generateStaticParams() {
  return ['en', 'ar'].flatMap(lang =>
    slugs.map(slug => ({ lang, slug }))
  );
}
```

---

### Phase 2 — Update `LanguageContext`

**File:** `src/context/LanguageContext.jsx`

**What changes:**
- Accept initial `lang` from the URL (passed as a prop from `[lang]/layout.js`) instead of reading from `localStorage`
- `changeLang(newLang)` navigates to the equivalent path in the new language instead of reloading
- `localStorage` is kept only as a hint for the root redirect — no longer the source of truth

```js
// Before
const changeLang = (newLang) => {
  localStorage.setItem("lang", newLang);
  setLang(newLang);
  window.location.reload();
};

// After
const changeLang = (newLang) => {
  localStorage.setItem("lang", newLang);
  const currentPath = pathname.replace(/^\/(en|ar)/, '');
  router.push(`/${newLang}${currentPath}`);
};
```

---

### Phase 3 — Root `/` Redirect

**File:** `src/app/page.jsx` (root, not inside `[lang]`)

A lightweight client-side redirect that sends users to `/en` or `/ar`:

```js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    const browserLang = navigator.language?.startsWith('ar') ? 'ar' : 'en';
    router.replace(`/${saved || browserLang}`);
  }, []);

  return null;
}
```

---

### Phase 4 — Fix SEO Metadata

**Files:** All `page.jsx` files (and `src/app/sitemap.js`)

**What changes:**

Each page's metadata must reference distinct URLs per language:

```js
// Before (broken — both point to same URL)
alternates: {
  canonical: "https://www.mentholatumarabia.com/",
  languages: {
    en: "https://www.mentholatumarabia.com/",
    ar: "https://www.mentholatumarabia.com/",
  },
}

// After (correct)
alternates: {
  canonical: "https://www.mentholatumarabia.com/en/",
  languages: {
    en: "https://www.mentholatumarabia.com/en/",
    ar: "https://www.mentholatumarabia.com/ar/",
    "x-default": "https://www.mentholatumarabia.com/",
  },
}
```

`sitemap.js` must output both language variants for every URL:

```js
// Each route becomes two entries:
{ url: 'https://www.mentholatumarabia.com/en/about' },
{ url: 'https://www.mentholatumarabia.com/ar/about' },
```

---

### Phase 5 — Update Internal Links

**Files:** `src/components/Navbar.jsx`, `src/components/Footer.jsx`, and any component with `<Link>` or `href` pointing to internal routes.

All internal links must be prefixed with the current language:

```jsx
// Before
<Link href="/about">About</Link>
<Link href="/brands">Brands</Link>

// After
<Link href={`/${lang}/about`}>About</Link>
<Link href={`/${lang}/brands`}>Brands</Link>
```

The `lang` value comes from `useTranslation()` (already available in all components via context), so no additional prop drilling is needed.

---

## Files Changed Summary

| Phase | Files | Type |
|---|---|---|
| 1 — Route restructure | ~14 page files moved + 1 new `[lang]/layout.js` | Move + create |
| 2 — LanguageContext | `src/context/LanguageContext.jsx` | Modify |
| 3 — Root redirect | `src/app/page.jsx` | Modify |
| 4 — SEO metadata | ~14 page files + `src/app/sitemap.js` | Modify |
| 5 — Internal links | `Navbar.jsx`, `Footer.jsx`, ~3–5 other components | Modify |

**Total: ~35 file touches, 0 new dependencies.**

---

## Testing Checklist

- [ ] `/` redirects to `/en` (default) or `/ar` (if previously selected or Arabic browser)
- [ ] `/en/about` and `/ar/about` both load correctly
- [ ] Language switcher on `/en/brands` navigates to `/ar/brands` (not `/ar/`)
- [ ] RTL layout active on all `/ar/...` pages
- [ ] `hreflang` tags in page source point to correct `/en/` and `/ar/` URLs
- [ ] Sitemap includes both language variants
- [ ] Dynamic routes work: `/en/product/[slug]`, `/ar/blogs/[slug]`, `/en/brand/[id]`
- [ ] Build succeeds (`npm run build`) and `out/` contains both `en/` and `ar/` folders
- [ ] No broken internal links (Navbar, Footer, in-page CTAs)
