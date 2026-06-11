"use client";
import React, { useState, useEffect, use, useMemo } from "react";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "@/context/LanguageContext";
import { getSingleProduct } from "@/services/mainService";
import { updateMetaTag } from "@/utils/seoHelper";
export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { t, lang } = useTranslation();

  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState(null);

  // Accordion active index for FAQ
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Dialog states for purchase options
  const [showCountriesDialog, setShowCountriesDialog] = useState(false);
  const [selectedProductCountries, setSelectedProductCountries] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState("");

  // Dialog states for buy links
  const [showBuyLinksDialog, setShowBuyLinksDialog] = useState(false);
  const [buyLinks, setBuyLinks] = useState([]);
  const [selectedBuyCountry, setSelectedBuyCountry] = useState("");

  // Load geo data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const geo = localStorage.getItem("geo");
      if (geo) {
        try {
          setGeoData(JSON.parse(geo));
        } catch (e) {
          setGeoData(geo);
        }
      }
    }
  }, []);

  useEffect(() => {
  if (!slug) return;
  setLoading(true);
  getSingleProduct(slug)
    .then((res) => {
      setProductDetails(res);
      setLoading(false);

      // Dynamic meta tags for SEO
      if (res?.product) {
        const product = res.product;
        
        // Page title
        document.title = `${product.name || product.title} - Mentholatum Arabia`;
        
        // Meta description
        const description = product.meta_description || product.details || product.description;
        updateMetaTag('description', description);
        
        // Meta keywords
        if (product.meta_keywords) {
          updateMetaTag('keywords', product.meta_keywords);
        }
        
        // Open Graph for social sharing
        updateMetaTag('og:title', product.meta_title || product.name);
        updateMetaTag('og:description', description);
        updateMetaTag('og:image', product.main_image || product.thumbnail || product.images?.[0]);
        updateMetaTag('og:url', window.location.href);
        updateMetaTag('og:type', 'product');
        
        // Twitter Card
        updateMetaTag('twitter:title', product.meta_title || product.name);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', product.main_image || product.thumbnail);
        updateMetaTag('twitter:card', 'summary_large_image');
      }
    })
    .catch((err) => {
      console.error("Error loading product:", err);
      setLoading(false);
    });
}, [slug]);

  const hasAnyPurchaseOption = (product) => {
    if (!product || !product.countries) return false;
    return product.countries.some(
      (c) => c.pivot?.where_to_buy_link || c.pivot?.available_in_pharmacies === 1
    );
  };

  const filterDuplicateCountries = (countriesList) => {
    const seen = new Set();
    return (countriesList || []).filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
  };

  // Parse and deduplicate buy links
  const parseAndDeduplicateLinks = (linkData) => {
    if (!linkData) return [];
    
    let parsedArray = [];

    if (Array.isArray(linkData)) {
      for (const item of linkData) {
        if (typeof item === 'string') {
          if (item.startsWith('[') || item.startsWith('{')) {
            try {
              const parsed = JSON.parse(item);
              if (Array.isArray(parsed)) {
                parsedArray = parsedArray.concat(parsed);
              } else {
                parsedArray.push(item);
              }
            } catch(e) {
              parsedArray.push(item);
            }
          } else {
            parsedArray.push(item);
          }
        } else {
          parsedArray.push(item);
        }
      }
    } else if (typeof linkData === 'string') {
      try {
        const parsed = JSON.parse(linkData);
        if (Array.isArray(parsed)) {
          parsedArray = parsed;
        } else if (typeof parsed === 'string') {
          try {
            const innerParsed = JSON.parse(parsed);
            if (Array.isArray(innerParsed)) {
              parsedArray = innerParsed;
            } else {
              parsedArray.push(parsed);
            }
          } catch(e) {
            parsedArray.push(parsed);
          }
        } else {
          parsedArray.push(parsed);
        }
      } catch (e) {
        const urlRegex = /(https?:\/\/[^\s"',\]]+)/g;
        const matches = linkData.match(urlRegex);
        if (matches) {
          parsedArray = matches;
        } else {
          console.error("Error parsing links:", e);
        }
      }
    }

    const cleanUrls = parsedArray
      .filter(item => typeof item === 'string' && item.trim() !== '')
      .map(url => url.replace(/\\\//g, '/').replace(/\\"/g, ''));
      
    return [...new Set(cleanUrls)];
  };

  // Extract retailer name from URL
  const getRetailerName = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      const name = domain.split('.')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch (e) {
      return "Buy Now";
    }
  };

  const handleWhereToBuy = () => {
    if (!productDetails || !productDetails.product) return;
    const product = productDetails.product;

    if (geoData) {
      const userCountry = geoData.country;
      const userCountryCode = geoData.countryCode;

      if (product.countries && product.countries.length > 0) {
        const matchingCountry = product.countries.find(
          (c) =>
            c.name_en === userCountry ||
            c.name_ar === userCountry ||
            c.name_en?.includes(userCountry) ||
            (userCountryCode && c.name_en?.includes(userCountryCode))
        );

        if (matchingCountry) {
          const linkData = matchingCountry.pivot?.where_to_buy_link;
          const links = parseAndDeduplicateLinks(linkData);
          
          // If single link, open directly
          if (links.length === 1) {
            window.open(links[0], "_blank");
            return;
          }
          
          // If multiple links, show dialog
          if (links.length > 1) {
            setBuyLinks(links);
            setSelectedBuyCountry(matchingCountry.name_en);
            setShowBuyLinksDialog(true);
            return;
          }
        }
      }
    }

    // Default fallback: show countries list in dialog
    const uniqueCountries = filterDuplicateCountries(product.countries || []);
    setSelectedProductCountries(uniqueCountries);
    setSelectedProductName(product.name);
    setShowCountriesDialog(true);
  };

  const hasAvailableCountries = useMemo(() => {
    return selectedProductCountries.some(
      (c) => c.pivot?.where_to_buy_link || c.pivot?.available_in_pharmacies === 1
    );
  }, [selectedProductCountries]);

  const sanitizeAnswer = (answer) => {
    if (!answer) return "";
    return answer
      .replace(/&nbsp;/g, " ")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .trim();
  };

  // Branding Color classes mapping
  const getBrandTextColor = () => {
    const brandId = String(productDetails?.product?.brand?.id || "");
    switch (brandId) {
      case "23": return "text-[#DC3B41]"; // Deep Heat
      case "24": return "text-[#184A9A]"; // Deep Freeze
      case "25": return "text-[#3D1A54]"; // Deep Relief
      case "26": return "text-[#E7317A]"; // Hada Labo
      case "27": return "text-[#30214E]"; // Rohto
      default: return "text-[#DC3B41]";
    }
  };

  const getBrandBgColor = () => {
    const brandId = String(productDetails?.product?.brand?.id || "");
    switch (brandId) {
      case "23": return "bg-[#C2332C]"; // Deep Heat
      case "24": return "bg-[#184A9A]"; // Deep Freeze
      case "25": return "bg-[#3D1A54]"; // Deep Relief
      case "26": return "bg-[#E7317A]"; // Hada Labo
      case "27": return "bg-[#30214E]"; // Rohto
      default: return "bg-[#C2332C]";
    }
  };

  if (loading || !productDetails?.product) {
    // Skeletons
    return (
      <main className="w-full mx-auto mt-10">
        <section className="py-14 bg-white relative page-width mx-auto">
          <div className="w-[80%] mx-auto grid items-center lg:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="w-[25%] flex flex-col gap-4">
                <Skeleton height="100px" width="100px" />
                <Skeleton height="100px" width="100px" />
              </div>
              <div className="w-[75%] flex justify-center">
                <Skeleton height="300px" width="300px" className="rounded-xl" />
              </div>
            </div>
            <div>
              <Skeleton height="48px" width="80%" className="mb-4" />
              <Skeleton height="20px" width="100%" className="mb-2" />
              <Skeleton height="20px" width="95%" className="mb-2" />
              <Skeleton height="20px" width="90%" className="mb-3" />
              <div className="flex gap-4 mt-6">
                <Skeleton height="40px" width="120px" className="rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F9F9F9] py-7">
          <Skeleton height="36px" width="60%" className="mb-8 mx-auto" />
          <div className="mx-auto w-[80%] flex flex-col gap-3">
            <Skeleton height="60px" />
            <Skeleton height="60px" />
          </div>
        </section>
      </main>
    );
  }

  const { product, faqs, relatedProducts } = productDetails;
  const productImage = product.images?.[0] || product.thumbnail || product.main_image || "";

  return (
    <main className="w-full mx-auto mt-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Product Details Section */}
      <section className="py-14 bg-white relative page-width mx-auto">
        <div className="grid items-center justify-between lg:grid-cols-2 page-width mx-auto gap-12">
          {/* Product Image Wrapper */}
          <div className="relative mx-auto w-[90%] sm:w-3/4 border-2 border-gray-200 rounded-xl p-4 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
            <img
              loading="lazy"
              src={productImage}
              alt={product.name}
              className="max-h-[350px] object-contain rounded-xl transition-transform hover:scale-105 duration-200"
            />
          </div>

          {/* Product Info */}
          <div className="text-start">
            <h2 className="text-[#0067B1] text-4xl font-bold mb-4">
              {product.name}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.details}
            </p>
            <p className="font-bold mb-6 text-gray-900">
              {t("product.brand")}:{" "}
              <span className={`font-extrabold ${getBrandTextColor()}`}>
                {product.brand?.name}
              </span>
            </p>

            <div className="buttons flex">
              <button
                onClick={handleWhereToBuy}
                disabled={!hasAnyPurchaseOption(product)}
                className={`text-white py-2.5 px-8 rounded-full text-sm font-semibold transition-all shadow-md cursor-pointer ${
                  hasAnyPurchaseOption(product)
                    ? "bg-[#0067B1] hover:bg-[#00348D]"
                    : "bg-gray-400 cursor-not-allowed opacity-70"
                }`}
              >
                {t("product.shopNow")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-[#F7F7F5] py-12">
        <h2 className="text-3xl text-center page-width mx-auto font-bold py-5 text-[#0067B1]">
          {t("product.about")} {product.name}
        </h2>

        <div className="my-8 max-w-4xl mx-auto px-4">
          {faqs && faqs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isActive = activeFaqIndex === idx;
                return (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <h3>
                      <button
                        onClick={() => setActiveFaqIndex(isActive ? null : idx)}
                        className="flex items-center justify-between w-full p-5 font-semibold text-gray-800 hover:bg-gray-50 transition-colors text-start gap-4"
                      >
                        <span>{faq.question}</span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                            isActive ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                          />
                        </svg>
                      </button>
                    </h3>
                    {isActive && (
                      <div className="p-5 border-t border-gray-100 bg-gray-50 text-gray-600 leading-relaxed text-sm">
                        <div
                          className="prose prose-sm max-w-none [&_li]:ms-6 [&_ul]:list-disc [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:mb-3 [&_strong]:font-bold"
                          dangerouslySetInnerHTML={{ __html: sanitizeAnswer(faq.answer) }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 text-gray-500 bg-white rounded-xl border border-gray-150 shadow-sm">
              {t("product.noFaq")}
            </div>
          )}
        </div>
      </section>

      {/* Symptom Checker Redirection Section */}
      <section className="bg-[#004576] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 items-center mx-auto page-width gap-8 px-4 text-start">
          <div className="img flex justify-center">
            <img
              loading="lazy"
              src="https://cdn.mentholatumarabia.com/images/imgs/mentholatumarabia-checker%20w%201%20(1).webp"
              alt="Symptom Checker"
              className="max-w-[280px] object-contain"
            />
          </div>
          <div className="content text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("product.symptomChecker.title")}
            </h2>
            <p className="md:text-lg mb-6 opacity-90 leading-relaxed">
              {t("product.symptomChecker.description")}
            </p>
            <Link href="/symptom-checker-v2">
              <button className="text-white py-3 px-8 rounded-full text-sm font-semibold bg-[#EF3E42] hover:bg-[#c82f33] cursor-pointer shadow-md transition-all">
                {t("product.symptomChecker.cta")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-14 page-width mx-auto px-4">
          <h2 className="text-start text-[#0067B1] text-3xl font-bold mb-8">
            {t("product.related.title")}{" "}
            <span className={getBrandTextColor()}>{product.brand?.name}</span>
          </h2>

          {/* Desktop view */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <div
                key={p.slug || p.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-lg transition-all"
              >
                {/* Product Image */}
                <div className="p-6 flex items-center justify-center h-[200px]">
                  <Link href={`/product/${p.slug}`}>
                    <img
                      loading="lazy"
                      src={p.thumbnail}
                      alt={p.name}
                      className="max-h-[160px] object-contain mx-auto hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                </div>

                {/* Details */}
                <div className="p-5 text-center mt-auto flex flex-col justify-between flex-grow">
                  <Link href={`/product/${p.slug}`} className="block mb-4">
                    <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                  </Link>

                  <Link href={`/product/${p.slug}`} className="block w-full">
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view - Horizontally Scrollable Row */}
          <div className="flex md:hidden overflow-x-auto gap-6 pb-6 snap-x scrollbar-none">
            {relatedProducts.map((p) => (
              <div
                key={p.slug || p.id}
                className="min-w-[280px] max-w-[280px] bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 snap-center"
              >
                <div className="p-6 flex items-center justify-center h-[180px]">
                  <Link href={`/product/${p.slug}`}>
                    <img
                      loading="lazy"
                      src={p.thumbnail}
                      alt={p.name}
                      className="max-h-[140px] object-contain mx-auto"
                    />
                  </Link>
                </div>
                <div className="p-4 text-center flex flex-col justify-between flex-grow pb-6">
                  <Link href={`/product/${p.slug}`} className="block mb-4">
                    <h3 className="font-bold text-gray-900 line-clamp-2">
                      {p.name}
                    </h3>
                  </Link>
                  <Link href={`/product/${p.slug}`} className="block w-full">
                    <button
                      disabled={!hasAnyPurchaseOption(p)}
                      className={`text-white py-2.5 px-6 rounded-full text-sm font-semibold block w-full cursor-pointer ${
                        hasAnyPurchaseOption(p)
                          ? "bg-[#0067B1] hover:bg-[#00348D]"
                          : "bg-gray-400 cursor-not-allowed opacity-70"
                      }`}
                    >
                      {t("shop.shopNow")}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Available Countries Dialog */}
      <Dialog
        visible={showCountriesDialog}
        onHide={() => setShowCountriesDialog(false)}
        style={{ width: "95vw", maxWidth: "600px" }}
        header={t("product.availableIn")}
        modal={true}
        dismissableMask={true}
        className="rounded-3xl overflow-hidden shadow-2xl text-start"
        pt={{
          header: { className: "px-6 py-5 flex items-center justify-between" },
          closeButton: { className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-gray-200 outline-none" },
          title: { className: "font-extrabold text-lg text-gray-800" },
          content: { className: "px-6 pb-6 pt-2" }
        }}
      >
        <div>
          <h3 className="text-xl font-black mb-5 text-gray-900 border-b border-gray-100 pb-3">{selectedProductName}</h3>
          {hasAvailableCountries ? (
            <>
              <p className="mb-4 text-gray-600">{t("product.availability.message")}</p>
              <div className="grid grid-cols-1 gap-4">
                {selectedProductCountries.map((country, idx) => {
                  const buyLink = country.pivot?.where_to_buy_link;
                  const availPharmacies = country.pivot?.available_in_pharmacies === 1;
                  const links = parseAndDeduplicateLinks(buyLink);

                  // Hide if no links and no pharmacy availability
                  if (links.length === 0 && !availPharmacies) return null;

                  return (
                    <div
                      key={country.id || idx}
                      className="p-4 border rounded-xl flex items-center justify-between transition-all"
                    >
                      <div>
                        <span className="font-semibold text-gray-900">{country.name_en}</span>
                        {country.name_ar && (
                          <p className="text-sm text-gray-500 font-light mt-0.5">{country.name_ar}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {links.length > 0 && (
                          <button
                            onClick={() => {
                              if (links.length === 1) {
                                window.open(links[0], "_blank");
                              } else {
                                setBuyLinks(links);
                                setSelectedBuyCountry(country.name_en);
                                setShowBuyLinksDialog(true);
                              }
                            }}
                            className="px-3.5 py-1.5 bg-[#0067B1] text-white rounded-full text-xs font-semibold shadow-sm hover:bg-[#00348D] transition-all cursor-pointer"
                          >
                            {t("product.buyNow")}
                          </button>
                        )}
                        {availPharmacies && (
                          <span className="px-3.5 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            {t("product.availableInPharmacies")}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-gray-500 py-4 text-center">{t("product.notAvailable")}</p>
          )}
        </div>
      </Dialog>

      {/* Buy Links Dialog - Multiple Retailers */}
      <Dialog
        visible={showBuyLinksDialog}
        onHide={() => setShowBuyLinksDialog(false)}
        style={{ width: "95vw", maxWidth: "600px" }}
        header={t("product.buyNow")}
        modal={true}
        dismissableMask={true}
        className="rounded-3xl overflow-hidden shadow-2xl text-start"
        pt={{
          header: { className: "px-6 py-5 flex items-center justify-between" },
          closeButton: { className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-gray-200 outline-none" },
          title: { className: "font-extrabold text-lg text-gray-800" },
          content: { className: "px-6 pb-6 pt-2" }
        }}
      >
        <div>
          <h3 className="text-lg font-black mb-2 text-gray-900">{selectedProductName}</h3>
          <p className="text-sm text-gray-600 mb-5 pb-3 border-b border-gray-100">
            {selectedBuyCountry} • {buyLinks.length} {buyLinks.length === 1 ? 'retailer' : 'retailers'}
          </p>
          
          <div className="flex flex-col gap-3">
            {buyLinks.map((link, idx) => {
              const retailerName = getRetailerName(link);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    window.open(link, "_blank");
                    setShowBuyLinksDialog(false);
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-[#0067B1] hover:bg-blue-50 transition-all flex items-center justify-between group"
                >
                  <div className="text-start">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#0067B1] transition-colors">
                      {retailerName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{new URL(link).hostname}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0067B1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 mt-5 pt-4 border-t border-gray-100">
            Click any retailer to visit their website in a new tab
          </p>
        </div>
      </Dialog>
    </main>
  );
}
