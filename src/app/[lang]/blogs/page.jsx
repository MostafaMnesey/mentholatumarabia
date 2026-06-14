"use client";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import { Paginator } from "primereact/paginator";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";
import { getBlogs } from "@/services/mainService";

const SKELETON_COUNT = 6;
const DEFAULT_ROWS = 10;

export default function BlogsPage() {
  const { t, lang } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(DEFAULT_ROWS);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getBlogs();

        if (!res?.blogs?.data) {
          throw new Error("Invalid response structure");
        }

        setBlogs(res.blogs.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch blogs";
        console.error("Error fetching blogs:", err);
        setError(message);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle pagination
  const onPageChange = useCallback((event) => {
    setFirst(event.first);
    setRows(event.rows);
  }, []);

  // Memoize paginated data to prevent unnecessary recalculations
  const paginatedBlogs = useMemo(
    () => blogs.slice(first, first + rows),
    [blogs, first, rows]
  );

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
                <Link href={`/${lang}/blogs/${blog.slug}`} className="block">
              <div key={blog.id || idx} className="group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <img
                    loading="lazy"
                    src={blog.thumbnail}
                    alt="Blog Image"
                    className="w-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                  />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mt-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">{blog.excerpt}</p>
                  </div>
                  <Link href={`/${lang}/blogs/${blog.slug}`} className="text-blue-500 font-medium mt-4 inline-flex items-center group/link">
                    {t("blogs.readMore")}
                    <i className={`pi ${lang === "en" ? "pi-arrow-right" : "pi-arrow-left"} mx-2 transition-transform duration-300 group-hover/link:translate-x-1`}></i>
                  </Link>
                </div>
              </div>
                </Link>
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
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}