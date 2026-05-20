"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import { Paginator } from "primereact/paginator";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";
import { getBlogs } from "@/services/mainService";

export default function BlogsPage() {
  const { t, lang } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  useEffect(() => {
    getBlogs()
      .then((res) => {
        if (res && res.blogs && res.blogs.data) {
          setBlogs(res.blogs.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const paginatedBlogs = blogs.slice(first, first + rows);

  return (
    <main className="w-full  mx-auto">
      <HeroBackground bgImage="https://cdn.mentholatumarabia.com/web/blogs-hero.webp" isHome={false}>
        <h1 className="text-3xl text-center my-10 font-bold text-white">
          {t("blogs.pageTitle")}
        </h1>
      </HeroBackground>

      <div className="mx-auto mb-8 py-10">
        <div className="w-[90%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeleton Placeholders */}
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full p-4">
                <Skeleton height="250px" className="mb-4" />
                <Skeleton width="70%" height="20px" className="mb-2" />
                <Skeleton width="90%" height="16px" className="mb-2" />
                <Skeleton width="60%" height="16px" />
              </div>
            ))
          ) : paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog, idx) => (
              <div key={blog.id || idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-200">
                <Link href={`/blogs/${blog.slug}`} className="block">
                  <img
                    loading="lazy"
                    src={blog.thumbnail}
                    alt="Blog Image"
                    className="w-full object-cover aspect-square"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mt-4 text-gray-900">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">{blog.excerpt}</p>
                  </div>
                  <Link href={`/blogs/${blog.slug}`} className="text-blue-500 font-medium mt-4 inline-flex items-center hover:underline">
                    {t("blogs.readMore")}
                    <i className={`pi ${lang === "en" ? "pi-arrow-right" : "pi-arrow-left"} mx-2`}></i>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No blogs found.
            </div>
          )}
        </div>

        {/* Paginator */}
        {!loading && blogs.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={blogs.length}
              rowsPerPageOptions={[10, 20]}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}
