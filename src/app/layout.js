import { Poppins, Tajawal } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import SeoTags from "@/components/SeoTags";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mentholatum Arabia",
  url: "https://www.mentholatumarabia.com",
  logo: { "@type": "ImageObject", url: "https://www.mentholatumarabia.com/new/muk logo.webp" },
  description: "Mentholatum - Specialists in family healthcare for over 130 years",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mentholatum Arabia",
  url: "https://www.mentholatumarabia.com",
  description: "Mentholatum - Specialists in family healthcare for over 130 years",
  inLanguage: ["en", "ar"],
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.mentholatumarabia.com"),
  title: "Mentholatum - Specialists in family healthcare for over 130 years",
  description: "Mentholatum - Specialists in family healthcare for over 130 years. Quality products for your family.",
  keywords: "mentholatum, healthcare, family health, deep heat, deep freeze",
  openGraph: {
    title: "Mentholatum - Specialists in family healthcare for over 130 years",
    description: "Mentholatum - Specialists in family healthcare for over 130 years. Quality products for your family.",
    type: "website",
    url: "https://www.mentholatumarabia.com",
    images: [{ url: "/new/muk logo.webp" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.mentholatumarabia.com" />
        <link rel="dns-prefetch" href="https://cdn.mentholatumarabia.com" />
        <link rel="preconnect" href="https://api.mentholatumarabia.com" />
        <link rel="dns-prefetch" href="https://api.mentholatumarabia.com" />
        <link rel="preconnect" href="https://ip-api.com" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      </head>
      <body className={`${poppins.variable} ${tajawal.variable} min-h-full flex flex-col font-sans bg-white text-gray-900`}>
        <SeoTags />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
