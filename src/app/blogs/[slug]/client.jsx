"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import BlogsSection from "@/components/BlogsSection";
import { useTranslation } from "@/context/LanguageContext";
import { getSingleBlog } from "@/services/mainService";
import { updateMetaTag } from "@/utils/seoHelper";
import ArticleContent from "@/components/ArticleContent";

export default function SingleBlogPage({ params }) {
  const { t } = useTranslation();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getSingleBlog(slug)
      .then((res) => {
        if (res && res.blog) {
          const blog = res.blog;
          setBlogData(blog);

          // Dynamic meta tags for SEO
          document.title = `${blog.meta_title || blog.title} - Mentholatum Arabia`;
          
          const description = blog.meta_description || blog.excerpt;
          updateMetaTag('description', description);
          
          if (blog.meta_keywords) {
            updateMetaTag('keywords', blog.meta_keywords);
          }
          
          updateMetaTag('og:title', blog.meta_title || blog.title);
          updateMetaTag('og:description', description);
          updateMetaTag('og:image', blog.image || blog.thumbnail);
          updateMetaTag('og:url', window.location.href);
          updateMetaTag('og:type', 'article');
          
          updateMetaTag('twitter:title', blog.meta_title || blog.title);
          updateMetaTag('twitter:description', description);
          updateMetaTag('twitter:image', blog.image || blog.thumbnail);
          updateMetaTag('twitter:card', 'summary_large_image');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching single blog:", err);
        setLoading(false);
      });
  }, [slug]);

  const formatContent = (content) => {
    if (!content) return "";
    return content
      .split("\r\n")
      .filter((paragraph) => paragraph.trim() !== "")
      .map((paragraph) => `<p class="mb-4 text-gray-700 leading-relaxed">${paragraph}</p>`)
      .join("");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0067B1]"></div>
        <span className="ml-4 text-gray-500 mt-4 font-semibold">{t("blog.loading")}</span>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-600">Blog not found</h2>
        <Link href="/blogs" className="mt-4 text-[#0067B1] hover:underline">
          Go back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full mx-auto page-width pt-8">
      {/* Header Section */}
      <section className="w-full page-width mx-auto pt-8 px-4">
        <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="text-[#0067B1] hover:underline">
            {t("blog.breadcrumb.home")}
          </Link>
          <span>/</span>
          <Link href="/blogs" className="text-[#0067B1] hover:underline">
            {t("blog.breadcrumb.blogs")}
          </Link>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-[200px] md:max-w-none">{blogData.title}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold my-5 text-gray-900 leading-tight">
          {blogData.title}
        </h1>

        <p className="mb-6 text-gray-600 text-lg leading-relaxed">
          {blogData.excerpt}
        </p>

        {/* Featured Image */}
        <div className="mb-8 flex justify-center">
          <img
            loading="lazy"
            src={blogData.image}
            alt={blogData.title}
            className="w-full md:w-1/2 h-auto rounded-3xl shadow-lg object-cover max-h-[500px]"
          />
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="w-full mx-auto px-4 pb-12">
        <div className="w-full prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:font-bold">
          <ArticleContent content={blogData.content} />
        </div>
      </section>

      {/* Related Articles Section */}
      <BlogsSection />
    </main>
  );
}
