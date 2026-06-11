import { Poppins, Tajawal } from "next/font/google";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import MotionProvider from "@/components/MotionProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    images: [
      {
        url: "/new/muk logo.webp",
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ip-api.com" />
        <link
          rel="preload"
          as="style"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            crossOrigin="anonymous"
          />
        </noscript>
      </head>
      <body className={`${poppins.variable} ${tajawal.variable} min-h-full flex flex-col font-sans bg-white text-gray-900`}>
        <MotionProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen overflow-hidden pt-20">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
