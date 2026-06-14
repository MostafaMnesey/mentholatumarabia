import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  return (
    <LanguageProvider lang={lang}>
      <Navbar />
      <main className="min-h-screen overflow-hidden pt-20">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
}
