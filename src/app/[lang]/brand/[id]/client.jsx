"use client";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import { useTranslation } from "@/context/LanguageContext";
import { getSingleBrand } from "@/services/mainService";
import { updateMetaTag } from "@/utils/seoHelper";
import SocialLinks from "@/components/SocialLinks";

export default function SingleBrandPage({ params }) {
  const { t, lang } = useTranslation();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSingleBrand(id)
      .then((res) => {
        if (res && res.brand) {
          const brand = res.brand;
          setBrandData(brand);
          
          // Update meta tags for SEO
          const title = brand.banner_title || brand.name || "Brand";
          const desc = brand.banner_desc || "";
          
          document.title = `${title} - Mentholatum Arabia`;
          updateMetaTag("description", desc);
          
          // Open Graph
          updateMetaTag("og:title", title);
          updateMetaTag("og:description", desc);
          updateMetaTag("og:type", "website");
          if (brand.logo || brand.image) {
             updateMetaTag("og:image", brand.logo || brand.image);
             updateMetaTag("twitter:image", brand.logo || brand.image);
          }
          
          // Twitter
          updateMetaTag("twitter:title", title);
          updateMetaTag("twitter:description", desc);
          updateMetaTag("twitter:card", "summary");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching single brand:", err);
        setLoading(false);
      });
  }, [id]);

  const socialMediaLinks = [
    {
      brand: "Rohto",
      id: "27",
      snapchat: "https://www.snapchat.com/add/rohtoarabia",
      facebook: "https://www.facebook.com/RohtoME",
      instagram: "https://www.instagram.com/rohto_arabia",
      tiktok: "https://www.tiktok.com/@rohto_arabia",
      youtube: "https://www.youtube.com/@MentholatumArabia",
    },
    {
      brand: "Hada Labo",
      id: "26",
      snapchat: "https://www.snapchat.com/add/hadalaboarabia",
      facebook: "https://facebook.com/HadaLaboArabia",
      instagram: "https://www.instagram.com/hadalaboarabia",
      tiktok: "https://www.tiktok.com/@hadalaboarabia",
      youtube: "https://www.youtube.com/@HadaLaboTokyoArabia",
    },
    {
      brand: "Deep Heat",
      id: "23",
      snapchat: "https://snapchat.com/t/ByiqWCZn",
      facebook: "https://www.facebook.com/share/1BDSYqD5RU/?mibextid=wwXIfr",
      instagram: "https://www.instagram.com/deepheatarabia",
      tiktok: "https://www.tiktok.com/@deepheatarabia",
      youtube: "https://www.youtube.com/@MentholatumArabia",
    },
    {
      brand: "Deep Freeze",
      id: "24",
      snapchat: "https://snapchat.com/t/LezMqGdI",
      facebook: "https://www.facebook.com/share/15VoahZGgq/?mibextid=wwXIfr",
      instagram: "https://www.instagram.com/deepfreezearabia",
      tiktok: "https://www.tiktok.com/@deepfreezearabia",
      youtube: "https://www.youtube.com/@MentholatumArabia",
    },
    {
      brand: "Deep Relief",
      id: "25",
      snapchat: "https://www.snapchat.com/add/deepreliefme",
      facebook: "https://www.facebook.com/share/15w5jr97Cy/?mibextid=wwXIfr",
      instagram: "https://www.instagram.com/deepreliefarabia",
      tiktok: "https://www.tiktok.com/@deepreliefarabia",
      youtube: "https://www.youtube.com/@MentholatumArabia",
    },
  ];

  const getBrandBgColor = () => {
    switch (id) {
      case "23":
        return "linear-gradient(180deg, #C2332C 0%, #FFF 60.5%)";
      case "24":
        return "linear-gradient(180deg, #0067B1 0%, #FFF 60.5%)";
      case "25":
        return "linear-gradient(180deg, #3D1A54 0%, #FFF 60.5%)";
      case "26":
        return "linear-gradient(180deg, #E7317A 0%, #FFF 60.5%)";
      case "27":
        return "linear-gradient(180deg, #30214E 0%, #FFF 60.5%)";
      default:
        return "linear-gradient(180deg, #C2332C 0%, #FFF 60.5%)";
    }
  };

  const getRadialBgClass = () => {
    switch (id) {
      case "23":
        return "radial-red";
      case "24":
        return "radial-blue";
      case "25":
        return "radial-green";
      case "26":
        return "radial-pink";
      case "27":
        return "radial-purple";
      default:
        return "radial-red";
    }
  };

  const getTitleColorClass = () => {
    switch (id) {
      case "23":
        return "text-[#DC3B41]";
      case "24":
        return "text-[#184A9A]";
      case "25":
        return "text-[#3D1A54]";
      case "26":
        return "text-[#E7317A]";
      case "27":
        return "text-[#30214E]";
      default:
        return "text-[#DC3B41]";
    }
  };

  const currentSocials = socialMediaLinks.find((item) => item.id === id);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="banner pt-24 pb-12 w-full"
        style={{ background: getBrandBgColor() }}
      >
        <div className="page-width mx-auto py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-y-5">
          <div className={getTitleColorClass()}>
            <h2 className="text-3xl mb-6 font-extrabold text-gray-900">
              {brandData ? (
                brandData.banner_title
              ) : (
                <Skeleton width="70%" height="42px" className="mb-2" />
              )}
            </h2>
            <div className="text-lg text-black leading-relaxed">
              {brandData ? (
                brandData.banner_desc
              ) : (
                <>
                  <Skeleton width="100%" height="24px" className="mb-2" />
                  <Skeleton width="90%" height="24px" className="mb-2" />
                  <Skeleton width="95%" height="24px" />
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-2/3 flex items-center justify-center relative bg-white rounded-3xl my-3 p-6 shadow-sm min-h-[300px]">
              {brandData ? (
                <img
                  fetchPriority="high"
                  src={brandData.banner_image}
                  className="max-h-[300px] object-contain"
                  alt={`${brandData.name} Products`}
                />
              ) : (
                <Skeleton shape="circle" size="15rem" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="page-width mx-auto px-4 py-8">
        <section className="relative">
          {/* Social links */}
          <SocialLinks currentSocials={currentSocials} />
          {/* Header */}
          <div className="header my-8">
            <h2 className="mb-6 text-2xl font-bold text-[#0067B1]">
              {t("Single-brand.title")}
            </h2>
            <div className="mx-auto text-lg text-gray-800 leading-relaxed">
              {brandData ? (
                brandData.desc
              ) : (
                <>
                  <Skeleton
                    width="80%"
                    height="24px"
                    className="mb-2 mx-auto"
                  />
                  <Skeleton width="70%" height="24px" className="mx-auto" />
                </>
              )}
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {!loading && brandData?.products?.length ? (
              brandData.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-200"
                >
                  <div
                    className={`p-6 flex items-center justify-center min-h-[250px] ${getRadialBgClass()}`}
                  >
                    <Link
                      href={`/${lang}/product/${product.slug}`}
                      className="cursor-pointer"
                    >
                      <img
                        loading="lazy"
                        src={product.thumbnail}
                        alt={product.name}
                        className="object-contain max-h-[200px]"
                      />
                    </Link>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <span className="font-light text-sm text-gray-500">
                      {brandData.name}
                    </span>
                    <Link href={`/${lang}/product/${product.slug}`}>
                      <h2 className="text-xl font-semibold text-gray-800 hover:underline my-2 cursor-pointer min-h-[56px] line-clamp-2">
                        {product.name}
                      </h2>
                    </Link>
                    <Link href={`/${lang}/product/${product.slug}`}>
                      <button className="mt-3 text-white py-2 block w-full rounded-full bg-[#0067B1] hover:bg-[#00348D] cursor-pointer transition-all">
                        {t("Single-brand.learnMore")}
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div
                    className={`p-6 flex items-center justify-center min-h-[250px] ${getRadialBgClass()}`}
                  >
                    <Skeleton width="160px" height="160px" />
                  </div>
                  <div className="p-4">
                    <Skeleton width="40%" height="20px" className="mb-2" />
                    <Skeleton width="70%" height="28px" className="mb-5" />
                    <Skeleton
                      width="120px"
                      height="40px"
                      className="rounded-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No products found for this brand.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
