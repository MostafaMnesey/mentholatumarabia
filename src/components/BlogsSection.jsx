"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { m } from "framer-motion";
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

  const BlogCard = ({ blog }) => (
    <Link href={`/${lang}/blogs/${blog.slug}`}>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-xl transition-all duration-300 group">
        <div className="overflow-hidden aspect-video relative">
          <img
            loading="lazy"
            src={blog.thumbnail}
            alt={blog.title || "Blog Image"}
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(blog.created_at || Date.now()).toLocaleDateString(
                  lang === "ar" ? "ar-EG" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#0067B1] transition-colors">
              {blog.title}
            </h3>
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
          <Link href={`/${lang}/blogs`}>
            <m.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full font-bold text-sm shadow-md shadow-[#0067B1]/10 hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t("blogsSection.header.viewAll")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </m.button>
          </Link>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <m.div
              key={blog.id || idx}
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <BlogCard blog={blog} />
            </m.div>
          ))}
        </div>

        {/* Mobile scroll snap — no PrimeReact Carousel */}
        <div className="block lg:hidden">
          {blogs.length > 0 && (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scrollbar-hide">
              {blogs.map((blog, idx) => (
                <div key={blog.id || idx} className="flex-none w-[85vw] snap-center">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          )}
        </div>

        <Link href={`/${lang}/blogs`} className="block w-full text-center mt-6 lg:hidden">
          <button className="px-8 py-3 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full font-bold shadow-md cursor-pointer transition-all inline-flex items-center gap-2">
            <span>{t("blogsSection.header.viewAll")}</span>
            <ArrowRight className="w-4.5 h-4.5 rtl:rotate-180" />
          </button>
        </Link>
      </div>
    </section>
  );
}
