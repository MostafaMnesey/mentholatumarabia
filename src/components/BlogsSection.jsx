"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Carousel } from "primereact/carousel";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";
import { getBlogs } from "../services/mainService";

export default function BlogsSection() {
  const { t, lang } = useTranslation();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((res) => {
        if (res && res.blogs && res.blogs.data) {
          setBlogs(res.blogs.data.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const itemTemplate = (blog) => {
    return (
      <Link href={`/blogs/${blog.slug}`}>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md m-2 overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-xl transition-all duration-300">
          <div className="overflow-hidden aspect-video relative">
            <img
              loading="lazy"
              src={blog.thumbnail}
              alt="Blog Image"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(blog.created_at || Date.now()).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug hover:text-[#0067B1] transition-colors">{blog.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 mt-3 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
            <div className="text-[#0067B1] font-bold text-sm mt-5 inline-flex items-center gap-1.5 hover:underline">
              <span>{t("blogsSection.blogCard.readMore")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="page-width mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 bg-[#EA0029] rounded-full"></span>
              <span className="text-[#EA0029] font-extrabold text-sm uppercase tracking-wider">
                {t("blogsSection.header.label")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {t("blogsSection.header.title")}
            </h2>
          </div>
          <Link href="/blogs">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full font-bold text-sm shadow-md shadow-[#0067B1]/10 hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t("blogsSection.header.viewAll")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </motion.button>
          </Link>
        </div>

        {/* Desktop view */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Link href={`/blogs/${blog.slug}`}>
                <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden flex flex-col h-full cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="overflow-hidden aspect-video relative">
                    <img
                      loading="lazy"
                      src={blog.thumbnail}
                      alt="Blog Image"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(blog.created_at || Date.now()).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#0067B1] transition-colors">{blog.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-3 mt-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                    <div className="text-[#0067B1] group-hover:text-[#00348D] font-bold text-sm mt-6 inline-flex items-center gap-1.5 transition-colors">
                      <span>{t("blogsSection.blogCard.readMore")}</span>
                      <ArrowRight className="w-4.5 h-4.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view */}
        <div className="card block lg:hidden">
          {blogs.length > 0 && (
            <Carousel
              value={blogs}
              numVisible={1}
              numScroll={1}
              responsiveOptions={responsiveOptions}
              showNavigators={false}
              showIndicators={false}
              circular
              autoplayInterval={5000}
              itemTemplate={itemTemplate}
            />
          )}
        </div>

        <Link href="/blogs" className="block w-full text-center mt-6 lg:hidden">
          <button className="px-8 py-3 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full font-bold shadow-md cursor-pointer transition-all inline-flex items-center gap-2">
            <span>{t("blogsSection.header.viewAll")}</span>
            <ArrowRight className="w-4.5 h-4.5 rtl:rotate-180" />
          </button>
        </Link>
      </div>
    </section>
  );
}
