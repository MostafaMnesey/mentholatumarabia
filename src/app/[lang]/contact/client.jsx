"use client";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import React, { useState, useEffect, useRef } from "react";
import HeroBackground from "@/components/HeroBackground";
import { useTranslation } from "@/context/LanguageContext";
import { contact } from "@/services/mainService";
import Link from "next/link";
import { Dialog } from "primereact/dialog";

import { COUNTRIES_DATA } from "@/utils/countriesData";

export default function ContactClient() {

  const { t, lang } = useTranslation();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    reason: "",
    captchaAnswer: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    type: false,
    reason: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef(null);

  // Distributors Dialog State
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);

  // Initialize reCAPTCHA
  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };
    loadRecaptcha();

    // Check periodically for grecaptcha to render
    let checkInterval = setInterval(() => {
      if (typeof window !== "undefined" && window.grecaptcha && window.grecaptcha.render) {
        clearInterval(checkInterval);
        try {
          window.grecaptcha.render("recaptcha-container", {
            sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
            callback: (token) => {
              setCaptchaToken(token);
              setFormData((prev) => ({ ...prev, captchaAnswer: token }));
            },
            "expired-callback": () => {
              setCaptchaToken("");
              setFormData((prev) => ({ ...prev, captchaAnswer: "" }));
            },
          });
        } catch (e) {
          console.warn("reCAPTCHA already rendered or error occurred", e);
        }
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      validateEmail(formData.email) &&
      formData.type.trim() !== "" &&
      formData.reason.trim() !== "" &&
      captchaToken !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      type: true,
      reason: true,
    });

    if (!isFormValid()) {
      setMessage({ type: "error", text: "Please fill in all required fields correctly." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    contact(formData)
      .then((res) => {
        setMessage({ type: "success", text: t("contact.contactForm.successMessage") });
        setFormData({
          name: "",
          email: "",
          type: "",
          reason: "",
          captchaAnswer: "",
        });
        setTouched({
          name: false,
          email: false,
          type: false,
          reason: false,
        });
        setCaptchaToken("");
        if (typeof window !== "undefined" && window.grecaptcha) {
          window.grecaptcha.reset();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Submit contact error:", err);
        const errorMsg = err.response?.data?.message || "Failed to send message. Please try again later.";
        setMessage({ type: "error", text: errorMsg });
        setCaptchaToken("");
        if (typeof window !== "undefined" && window.grecaptcha) {
          window.grecaptcha.reset();
        }
        setLoading(false);
      });
  };

  const openDialog = (country) => {
    setSelectedCountry(country);
    setDisplayDialog(true);
  };

  const closeDialog = () => {
    setDisplayDialog(false);
    setSelectedCountry(null);
  };

  return (
    <main className="w-full">
      <HeroBackground bgImage="https://cdn.mentholatumarabia.com/web/contact_banner.webp" isHome={false}>
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-8">
          {t("contact.hero.title")}
        </h1>
      </HeroBackground>

      {/* Contact Form Section */}
      <section className="py-14 bg-white relative">
        <div className="w-[80%] mx-auto grid items-center lg:grid-cols-2 gap-12">
          <div className="mb-6">
            <div>
              <h2 className="text-red-500 font-semibold mb-5 flex items-center">
                <span className="block h-0.5 w-6 bg-red-500 me-2"></span>
                {t("contact.contactForm.sectionTitle")}
              </h2>
              <p className="font-bold capitalize text-xl text-gray-900 mb-6">
                {t("contact.contactForm.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="relative flex flex-col gap-1.5">
                <label className="text-gray-700 text-sm font-semibold">
                  {t("contact.contactForm.name")}
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  className={`w-full px-4 py-3 rounded-lg bg-[#F7F7F5] border ${
                    touched.name && !formData.name.trim() ? "border-red-500" : "border-transparent"
                  } focus:outline-none text-gray-800`}
                />
                {touched.name && !formData.name.trim() && (
                  <small className="text-red-500 block">Name is required</small>
                )}
              </div>

              <div className="relative flex flex-col gap-1.5">
                <label className="text-gray-700 text-sm font-semibold">
                  {t("contact.contactForm.email")}
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  className={`w-full px-4 py-3 rounded-lg bg-[#F7F7F5] border ${
                    touched.email && (!formData.email || !validateEmail(formData.email))
                      ? "border-red-500"
                      : "border-transparent"
                  } focus:outline-none text-gray-800`}
                />
                {touched.email && !formData.email && (
                  <small className="text-red-500 block">Email is required</small>
                )}
                {touched.email && formData.email && !validateEmail(formData.email) && (
                  <small className="text-red-500 block">Invalid email format</small>
                )}
              </div>

              <div className="relative flex flex-col gap-1.5">
                <label className="text-gray-700 text-sm font-semibold">
                  {t("contact.contactForm.type")}
                </label>
                <input
                  name="type"
                  type="text"
                  value={formData.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  className={`w-full px-4 py-3 rounded-lg bg-[#F7F7F5] border ${
                    touched.type && !formData.type.trim() ? "border-red-500" : "border-transparent"
                  } focus:outline-none text-gray-800`}
                />
                {touched.type && !formData.type.trim() && (
                  <small className="text-red-500 block">Type of enquiry is required</small>
                )}
              </div>

              <div className="relative flex flex-col gap-1.5">
                <label className="text-gray-700 text-sm font-semibold">
                  {t("contact.contactForm.reason")}
                </label>
                <textarea
                  name="reason"
                  rows={5}
                  value={formData.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-[#F7F7F5] border ${
                    touched.reason && !formData.reason.trim() ? "border-red-500" : "border-transparent"
                  } focus:outline-none text-gray-800`}
                ></textarea>
                {touched.reason && !formData.reason.trim() && (
                  <small className="text-red-500 block">Message is required</small>
                )}
              </div>

              <div className="relative my-2">
                <div id="recaptcha-container"></div>
                {touched.reason && !captchaToken && (
                  <small className="text-red-500 block mt-1">Please complete the CAPTCHA</small>
                )}
              </div>

              {message.text && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium ${
                    message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#0067B1] hover:bg-[#00348D] text-white rounded-full font-medium shadow-md cursor-pointer transition-all w-fit flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : t("contact.contactForm.submit")}
                <i className={`pi ${lang === "en" ? "pi-arrow-right" : "pi-arrow-left"}`}></i>
              </button>
            </form>
          </div>

          <div className="mb-6 flex justify-center lg:justify-end">
            <img loading="lazy" src="https://cdn.mentholatumarabia.com/images/imgs/new%20logo.webp" className="w-3/4 aspect-square object-contain" alt="" />
          </div>
        </div>
      </section>

      {/* Distributors Section */}
      <section className="py-14 bg-[#F6F6F6] relative">
        <h2 className="text-center text-2xl font-bold text-[#003DA6] mb-6">
          {t("contact.regions.middleEast")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[80%] mx-auto my-6 gap-8">
          {COUNTRIES_DATA.map((country, idx) => (
            <div key={idx} className="item w-full overflow-hidden">
              <div
                className="rounded-full flex items-center my-3 bg-white py-4 px-4 cursor-pointer transition-all hover:bg-gray-100 border border-gray-100 shadow-sm group"
                onClick={() => openDialog(country)}
              >
                <img loading="lazy" src={country.flag} className="w-10 h-6 mx-2 object-contain" alt={country.name} />
                <span className="text-[#00295A] flex-1 truncate font-medium px-2">
                  {t(`contact.countries.${country.key}.name`)}
                </span>
                <i className={`pi ${lang === "en" ? "pi-arrow-right" : "pi-arrow-left"} mx-2 text-gray-400 group-hover:text-[#0067B1] transition-colors`}></i>
              </div>
            </div>
          ))}
        </div>

        {/* Dialog for distributor detail */}
        <Dialog
          header={
            <div className="flex items-center gap-2 text-gray-800">
              <span className="font-extrabold text-lg">
                {selectedCountry ? t(`contact.countries.${selectedCountry.key}.name`) : ""}
              </span>
            </div>
          }
          visible={displayDialog}
          onHide={closeDialog}
          modal={true}
          dismissableMask={true}
          style={{ width: "95vw", maxWidth: "600px" }}
          className="rounded-3xl overflow-hidden shadow-2xl"
          pt={{
            header: { className: "px-6 py-5 flex items-center justify-between" },
            closeButton: { className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-gray-200 outline-none" },
            content: { className: "px-6 pb-6 pt-2" }
          }}
        >
          {selectedCountry && (
            <div className="overflow-x-auto py-3">
              <div className="mx-2 min-w-[300px] text-wrap">
                {selectedCountry.distributors.map((distributor, idx) => (
                  <div key={idx} className="w-full border-b last:border-b-0 pb-4 mb-4 last:pb-0 last:mb-0">
                    {/* Company */}
                    <div className="my-4 w-full">
                      <div className="flex items-start">
                        <i className="pi pi-map-marker text-[#0067B1] mt-1 mx-3 text-lg"></i>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 text-xl font-bold leading-relaxed">
                            {t(`contact.countries.${selectedCountry.key}.distributors.${idx}.company`)}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    {distributor.phone && (
                      <div className="my-3 w-full">
                        <div className="flex items-start">
                          <i className="pi pi-phone text-[#0067B1] mt-1 mx-3 text-lg"></i>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 text-[#0067B1] font-medium">
                              {distributor.phone.split("/").map((num, nIdx, arr) => (
                                <React.Fragment key={nIdx}>
                                  <a href={`tel:${num.trim()}`} className="hover:underline">
                                    {num.trim()}
                                  </a>
                                  {nIdx < arr.length - 1 && <span className="text-gray-400">/</span>}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {distributor.email && (
                      <div className="my-3 w-full">
                        <div className="flex items-start">
                          <i className="pi pi-envelope text-[#0067B1] mt-1 mx-3 text-lg"></i>
                          <div className="flex-1 min-w-0">
                            <a
                              href={`mailto:${distributor.email}`}
                              className="text-[#0067B1] hover:underline font-medium transition-colors block"
                            >
                              {distributor.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Address */}
                    <div className="my-3 w-full">
                      <div className="flex items-start">
                        <i className="pi pi-compass text-[#0067B1] mt-1 mx-3 text-lg"></i>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-600 leading-relaxed font-light">
                            {t(`contact.countries.${selectedCountry.key}.distributors.${idx}.address`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Dialog>
      </section>
    </main>
  );
}
