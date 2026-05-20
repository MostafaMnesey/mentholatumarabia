"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X, Globe, ChevronDown, Check, ArrowRight } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();
  const { t, changeLang, lang } = useTranslation();
  
  const discoverRef = useRef(null);
  const langRef = useRef(null);

  // Monitor scroll state for styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside clicks for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (discoverRef.current && !discoverRef.current.contains(event.target)) {
        setDiscoverOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: t("nav.brands"), href: "/brands" },
    { name: t("nav.checker"), href: "/symptom-checker-v2" },
    { name: t("nav.shop"), href: "/shop" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "backdrop-blur-md bg-white/80 border-gray-200/50 shadow-sm py-2"
          : "bg-white border-transparent py-4"
      }`}
    >
      <div className="mx-auto flex page-width w-full items-center justify-between px-4 relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <motion.img
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            src="/new/muk logo.webp"
            className="w-[180px] sm:w-[220px] md:w-[250px] transition-transform duration-300 hover:scale-[1.02]"
            alt="Mentholatum Logo"
          />
        </Link>

        {/* Mobile Navigation Trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative z-50 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 rtl:space-x-reverse font-medium text-gray-800">
          <ul className="flex items-center space-x-1 xl:space-x-2 rtl:space-x-reverse">
            {/* Discover Dropdown */}
            <li ref={discoverRef} className="relative">
              <button
                onClick={() => setDiscoverOpen(!discoverOpen)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full transition-all text-sm font-semibold select-none cursor-pointer hover:bg-gray-100/70 ${
                  discoverOpen ? "text-[#0067B1] bg-gray-100/80" : "text-gray-800"
                }`}
              >
                <span>{t("nav.discover")}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${discoverOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {discoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-[60] origin-top-left"
                  >
                    <Link
                      href="/about"
                      onClick={() => setDiscoverOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#0067B1] hover:bg-gray-50 rounded-xl transition-all"
                    >
                      {t("nav.about")}
                    </Link>
                    <Link
                      href="/blogs"
                      onClick={() => setDiscoverOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#0067B1] hover:bg-gray-50 rounded-xl transition-all"
                    >
                      {t("nav.blogs")}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Direct Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:bg-gray-100/70 block ${
                      isActive ? "text-[#0067B1]" : "text-gray-800"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#0067B1] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Contact Button */}
          <Link href="/contact" className="mx-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0067B1] hover:bg-[#00348D] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-[#0067B1]/20 hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{t("nav.contact")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </motion.button>
          </Link>

          {/* Language Selector Dropdown */}
          <div ref={langRef} className="relative ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 p-2.5 rounded-full transition-all cursor-pointer hover:bg-gray-100/70 ${
                langOpen ? "text-[#0067B1] bg-gray-100/80" : "text-gray-700"
              }`}
              aria-label="Language Selector"
            >
              <Globe className="w-4.5 h-4.5" />
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-36 bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 z-[60] origin-top-right text-sm"
                >
                  <button
                    onClick={() => {
                      changeLang("en");
                      setLangOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
                      lang === "en" ? "text-[#0067B1] bg-blue-50/50" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>English</span>
                    {lang === "en" && <Check className="w-4 h-4 stroke-[3px]" />}
                  </button>
                  <button
                    onClick={() => {
                      changeLang("ar");
                      setLangOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
                      lang === "ar" ? "text-[#0067B1] bg-blue-50/50" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>العربية</span>
                    {lang === "ar" && <Check className="w-4 h-4 stroke-[3px]" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Slide-In Drawer */}
            <motion.div
              initial={{ x: lang === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ar" ? "-100%" : "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className={`fixed top-0 bottom-0 ${
                lang === "ar" ? "left-0" : "right-0"
              } w-[290px] sm:w-[320px] bg-white shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto lg:hidden`}
            >
              <div className="flex flex-col space-y-6">
                {/* Header Logo */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <img src="/new/muk logo.webp" className="w-[140px]" alt="Mentholatum Logo" />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4">
                  {/* Discover Section */}
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-2.5 px-3">
                      {t("nav.discover")}
                    </h4>
                    <div className="flex flex-col space-y-1">
                      <Link
                        href="/about"
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-2.5 rounded-xl font-bold text-gray-700 hover:text-[#0067B1] hover:bg-gray-50 transition-all block text-sm"
                      >
                        {t("nav.about")}
                      </Link>
                      <Link
                        href="/blogs"
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-2.5 rounded-xl font-bold text-gray-700 hover:text-[#0067B1] hover:bg-gray-50 transition-all block text-sm"
                      >
                        {t("nav.blogs")}
                      </Link>
                    </div>
                  </div>

                  {/* Core Sections */}
                  <div className="border-t border-gray-100 pt-4 flex flex-col space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-2.5 rounded-xl font-bold text-gray-700 hover:text-[#0067B1] hover:bg-gray-50 transition-all block text-sm"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="border-t border-gray-100 pt-4 px-2">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      <button className="w-full bg-[#0067B1] hover:bg-[#00348D] text-white px-6 py-3 rounded-full font-bold shadow-md shadow-[#0067B1]/10 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 text-sm">
                        <span>{t("nav.contact")}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Language Options at bottom */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-3 px-3">
                  {t("nav.lang")}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      changeLang("en");
                      setMobileOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer text-center ${
                      lang === "en" ? "bg-blue-50 text-[#0067B1] border border-blue-100" : "bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      changeLang("ar");
                      setMobileOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer text-center ${
                      lang === "ar" ? "bg-blue-50 text-[#0067B1] border border-blue-100" : "bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100"
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
