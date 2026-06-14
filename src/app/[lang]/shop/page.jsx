"use client";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "primereact/skeleton";
import { Dialog } from "primereact/dialog";
import { ShoppingBag, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";
import { shopByBrand } from "@/services/mainService";

const videoLink = {
  23: "https://cdn.mentholatumarabia.com/videos/deep_heat_web.mp4",
  24: "https://cdn.mentholatumarabia.com/videos/deep_web.mp4",
  25: "https://cdn.mentholatumarabia.com/videos/deep_rel_web.mp4",
  26: "https://cdn.mentholatumarabia.com/videos/heda__web.mp4",
  27: "https://cdn.mentholatumarabia.com/videos/rohto_web.mp4",
  // String keys/slugs as fallback for direct query matches
  "deep-heat": "https://cdn.mentholatumarabia.com/videos/deep_heat_web.mp4",
  "deep-freeze": "https://cdn.mentholatumarabia.com/videos/deep_web.mp4",
  "deep-relief": "https://cdn.mentholatumarabia.com/videos/deep_rel_web.mp4",
  "hada-labo": "https://cdn.mentholatumarabia.com/videos/heda__web.mp4",
  "rohto": "https://cdn.mentholatumarabia.com/videos/rohto_web.mp4",
  "deep_heat": "https://cdn.mentholatumarabia.com/videos/deep_heat_web.mp4",
  "deep_freeze": "https://cdn.mentholatumarabia.com/videos/deep_web.mp4",
  "deep_relief": "https://cdn.mentholatumarabia.com/videos/deep_rel_web.mp4",
  "hada_labo": "https://cdn.mentholatumarabia.com/videos/heda__web.mp4",
};
const imagePlaceHolder = {
  23: "https://cdn.mentholatumarabia.com/videos/deep_heat.png",
  24: "https://cdn.mentholatumarabia.com/videos/deep_freeze.png",
  25: "https://cdn.mentholatumarabia.com/videos/deep_rel.png",
  26: "https://cdn.mentholatumarabia.com/videos/hada.png",
  27: "https://cdn.mentholatumarabia.com/videos/rohto.png",
  // String keys/slugs as fallback for direct query matches
  "deep-heat": "https://cdn.mentholatumarabia.com/videos/deep_heat.png",
  "deep-freeze": "https://cdn.mentholatumarabia.com/videos/deep_freeze.png",
  "deep-relief": "https://cdn.mentholatumarabia.com/videos/deep_rel.png",
  "hada-labo": "https://cdn.mentholatumarabia.com/videos/hada.png",
  "rohto": "https://cdn.mentholatumarabia.com/videos/rohto.png",
  "deep_heat": "https://cdn.mentholatumarabia.com/videos/deep_heat.png",
  "deep_freeze": "https://cdn.mentholatumarabia.com/videos/deep_freeze.png",
  "deep_relief": "https://cdn.mentholatumarabia.com/videos/deep_rel.png",
  "hada_labo": "https://cdn.mentholatumarabia.com/videos/hada.png",
};

function ShopContent() {
  const { t, lang } = useTranslation();
  const searchParams = useSearchParams();
  const brandQuery = searchParams.get("brand");

  const [brands, setBrands] = useState([]);
  const initialBrandKey = brandQuery?.toLowerCase();
  const [selectedVideo, setSelectedVideo] = useState(
    videoLink[initialBrandKey] || videoLink[23],
  );
  const [selectedVideoPlaceHolder, setSelectedVideoPlaceHolder] = useState(
    imagePlaceHolder[initialBrandKey] || imagePlaceHolder[23],
  );
  const [products, setProducts] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  // Dialog states
  const [showCountriesDialog, setShowCountriesDialog] = useState(false);
  const [selectedProductCountries, setSelectedProductCountries] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [geoData, setGeoData] = useState(null);

  // Dialog states for buy links
  const [showBuyLinksDialog, setShowBuyLinksDialog] = useState(false);
  const [buyLinks, setBuyLinks] = useState([]);
  const [selectedBuyCountry, setSelectedBuyCountry] = useState("");

  // Load geo data from localStorage on mount
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

  // Fetch shop data
  useEffect(() => {
    shopByBrand("")
      .then((res) => {
        if (res) {
          const fetchedProducts = res.products || [];
          setBrands(res.brands || []);
          setProducts(fetchedProducts);

          // Build master country list from all products (deduped by id, no pivot)
          const seenIds = new Set();
          const masterCountries = [];
          for (const p of fetchedProducts) {
            for (const c of p.countries || []) {
              if (!seenIds.has(c.id)) {
                seenIds.add(c.id);
                masterCountries.push({ id: c.id, name_en: c.name_en, name_ar: c.name_ar });
              }
            }
          }
          masterCountries.sort((a, b) => (a.name_en || "").localeCompare(b.name_en || ""));
          setAllCountries(masterCountries);

          // Set active tab based on query param
          if (brandQuery && res.brands) {
            const matchingIndex = res.brands.findIndex(
              (b) =>
                b.slug === brandQuery ||
                b.name?.toLowerCase() === brandQuery.toLowerCase(),
            );
            if (matchingIndex !== -1) {
              setSelectedTab(matchingIndex);
            }
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shop data:", err);
        setLoading(false);
      });
  }, [brandQuery]);

  // Compute tabs with background colors
  const tabs = useMemo(() => {
    const bgColors = ["#EA0029", "#0067B1", "#5C2D91", "#E81E63", "#3F51B5"];
    return brands.map((brand, index) => {
      const brandProducts = products.filter(
        (product) => String(product.brand_id) === String(brand.id),
      );

      return {
        title: brand.name,
        value: index,
        products: brandProducts,
        bgColor: bgColors[index % bgColors.length],
        brand: brand,
      };
    });
  }, [brands, products]);

  const activeTabDetails = tabs[selectedTab] || null;

  // Sync selectedVideo and selectedVideoPlaceHolder with activeTabDetails
  useEffect(() => {
    if (activeTabDetails?.brand?.id) {
      const brandId = activeTabDetails.brand.id;
      if (videoLink[brandId]) {
        setSelectedVideo(videoLink[brandId]);
      }
      if (imagePlaceHolder[brandId]) {
        setSelectedVideoPlaceHolder(imagePlaceHolder[brandId]);
      }
    }
  }, [activeTabDetails]);

  const hasAnyPurchaseOption = (product) => {
    if (!product || !product.countries) return false;
    return product.countries.some(
      (c) =>
        c.pivot?.where_to_buy_link || c.pivot?.available_in_pharmacies === 1,
    );
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
      const domain = new URL(url).hostname.replace("www.", "");
      const name = domain.split(".")[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch (e) {
      return "Buy Now";
    }
  };

  const handleWhereToBuy = (product) => {
    if (geoData) {
      const userCountry = geoData.country;
      const userCountryCode = geoData.countryCode;

      if (product.countries && product.countries.length > 0) {
        const matchingCountry = product.countries.find(
          (c) =>
            c.name_en === userCountry ||
            c.name_ar === userCountry ||
            c.name_en?.includes(userCountry) ||
            (userCountryCode && c.name_en?.includes(userCountryCode)),
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

    // Default: Show dialog — use master country list with per-product pivot overlaid
    const productCountryMap = new Map(
      (product.countries || []).map((c) => [c.id, c.pivot])
    );
    const countriesWithPivot = allCountries.map((c) => ({
      ...c,
      pivot: productCountryMap.get(c.id) || null,
    }));
    setSelectedProductCountries(countriesWithPivot);
    setSelectedProductName(product.name);
    setShowCountriesDialog(true);
  };

  return (
    <main className="w-full bg-gray-50/50 min-h-screen pb-16">
      <section className="mt-9 relative">
        <HeroBackground
          hlsUrl={selectedVideo}
          bgImage={selectedVideoPlaceHolder}
          isHome={false}
        />
      </section>

      <section className="p-5 lg:p-10 w-full page-width mx-auto">
        <div className="mx-auto">
          {loading || tabs.length === 0 ? (
            // Skeleton loader
            <div>
              <div className="flex flex-nowrap overflow-auto gap-4 my-8 pb-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    height="46px"
                    width="140px"
                    className="rounded-full flex-shrink-0"
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-gray-150 p-6 text-center shadow-sm"
                  >
                    <Skeleton
                      width="140px"
                      height="140px"
                      className="mx-auto mb-6"
                    />
                    <Skeleton
                      width="70%"
                      height="24px"
                      className="mb-4 mx-auto"
                    />
                    <Skeleton
                      width="120px"
                      height="40px"
                      className="rounded-full mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Tab View
            <div>
              {/* Tab Header list */}
              <div
                className="flex flex-wrap justify-center flex-nowrap overflow-x-auto my-10 gap-3 pb-3 scrollbar-hide"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {tabs.map((tab) => {
                  const isSelected = selectedTab === tab.value;

                  return (
                    <motion.button
                      key={tab.value}
                      onClick={() => {
                        setSelectedTab(tab.value);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-8 py-3.5 block text-sm font-bold rounded-full transition-all duration-300 text-center whitespace-nowrap cursor-pointer shadow-sm relative ${
                        isSelected
                          ? "text-white"
                          : "text-gray-700 bg-white border border-gray-200/80 hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor: isSelected ? tab.bgColor : undefined,
                      }}
                    >
                      <span>{tab.title}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Tab Content Panel */}
              <AnimatePresence mode="wait">
                {activeTabDetails && (
                  <motion.div
                    key={selectedTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                      {activeTabDetails.products.length > 0 ? (
                        activeTabDetails.products.map((product, idx) => (
                          <motion.div
                            key={product.id || product.slug}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{
                              y: -8,
                              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)",
                            }}
                            className="bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-gray-150 transition-all duration-300"
                          >
                            {/* Image area */}
                            <div className="p-6 flex items-center justify-center h-[240px] relative bg-white overflow-hidden group">
                              <Link
                                href={`/${lang}/product/${product.slug}`}
                                className="block"
                              >
                                <img
                                  loading="lazy"
                                  src={product.thumbnail}
                                  alt={product.name}
                                  className="max-h-[190px] max-w-full object-contain mx-auto transition-transform group-hover:scale-105 duration-500"
                                />
                              </Link>
                            </div>

                            {/* Details area */}
                            <div className="p-6 text-center mt-auto flex flex-col justify-between flex-grow bg-white border-t border-gray-50">
                              <Link
                                href={`/${lang}/product/${product.slug}`}
                                className="block mb-6"
                              >
                                <h3 className="font-extrabold text-gray-900 text-base leading-snug hover:text-[#0067B1] transition-colors line-clamp-2 min-h-[44px]">
                                  {product.name}
                                </h3>
                              </Link>

                              <button
                                onClick={() => handleWhereToBuy(product)}
                                disabled={!hasAnyPurchaseOption(product)}
                                className={`w-full text-white py-3 px-6 rounded-full text-sm font-bold shadow-md transition-all duration-300 mt-auto cursor-pointer flex items-center justify-center gap-1.5 ${
                                  hasAnyPurchaseOption(product)
                                    ? "hover:brightness-95 active:scale-98"
                                    : "opacity-45 cursor-not-allowed"
                                }`}
                                style={{
                                  backgroundColor: hasAnyPurchaseOption(product)
                                    ? activeTabDetails.bgColor
                                    : "#9ca3af",
                                  boxShadow: hasAnyPurchaseOption(product)
                                    ? `0 10px 15px -3px ${activeTabDetails.bgColor}25`
                                    : undefined,
                                }}
                              >
                                <ShoppingBag className="w-4 h-4" />
                                <span>{t("shop.shopNow")}</span>
                              </button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full text-center text-gray-500 py-16 bg-white border border-gray-150 rounded-3xl p-8">
                          No products available for this brand.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Available Countries Dialog */}
      <Dialog
        visible={showCountriesDialog}
        onHide={() => setShowCountriesDialog(false)}
        style={{ width: "95vw", maxWidth: "600px" }}
        header={
          <div className="flex items-center gap-2 text-gray-800">
            <MapPin className="w-5 h-5 text-[#0067B1]" />
            <span className="font-extrabold text-lg">
              {t("shop.availableCountriesHeader")}
            </span>
          </div>
        }
        modal={true}
        dismissableMask={true}
        className="rounded-3xl overflow-hidden shadow-2xl"
        pt={{
          header: { className: "px-6 py-5 flex items-center justify-between" },
          closeButton: { className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-gray-200 outline-none" },
          content: { className: "px-6 pb-6 pt-2" }
        }}
      >
        <div>
          <h3 className="text-xl font-black mb-5 text-gray-900 border-b border-gray-100 pb-3">
            {selectedProductName}
          </h3>
          <>
            <p className="mb-5 text-gray-600 text-sm">
              {t("shop.productAvailableText")}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {selectedProductCountries.map((country, idx) => {
                const buyLink = country.pivot?.where_to_buy_link;
                const availPharmacies =
                  country.pivot?.available_in_pharmacies === 1;
                const links = parseAndDeduplicateLinks(buyLink);
                const hasOptions = links.length > 0 || availPharmacies;

                return (
                  <motion.div
                    key={country.id || idx}
                    whileHover={
                      links.length > 0
                        ? { scale: 1.01, backgroundColor: "#f9fafb" }
                        : {}
                    }
                    onClick={() => {
                      if (links.length === 1) {
                        window.open(links[0], "_blank");
                      } else if (links.length > 1) {
                        setBuyLinks(links);
                        setSelectedBuyCountry(country.name_en);
                        setShowBuyLinksDialog(true);
                      }
                    }}
                    className={`p-5 border rounded-2xl flex items-center justify-between transition-all ${
                      links.length > 0
                        ? "cursor-pointer border-gray-200/80 hover:border-[#0067B1]/40"
                        : "border-gray-100 bg-gray-50/50 opacity-60"
                    }`}
                  >
                    <div className="text-start">
                      <span className="font-bold text-gray-900 text-base">
                        {country.name_en}
                      </span>
                      {country.name_ar && (
                        <p className="text-sm text-gray-400 font-medium mt-0.5">
                          {country.name_ar}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {!hasOptions && (
                        <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded-full text-xs font-bold">
                          {t("shop.notAvailable")}
                        </span>
                      )}
                      {links.length > 0 && (
                        <span className="px-4 py-2 bg-[#0067B1] text-white rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1">
                          <span>{t("shop.buyNow")}</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                      {availPharmacies && (
                        <span className="px-4 py-2 bg-gray-100 text-gray-600 border border-gray-200/40 rounded-full text-xs font-bold inline-flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                          <span>{t("shop.availableInPharmacies")}</span>
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        </div>
      </Dialog>

      {/* Buy Links Dialog - Multiple Retailers */}
      <Dialog
        visible={showBuyLinksDialog}
        onHide={() => setShowBuyLinksDialog(false)}
        style={{ width: "95vw", maxWidth: "600px" }}
        header={t("shop.buyNow") || "Buy Now"}
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

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-500">Loading shop...</div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
