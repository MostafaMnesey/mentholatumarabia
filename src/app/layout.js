import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans bg-white text-gray-900`}>
        <PrimeReactProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen overflow-hidden pt-20">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
