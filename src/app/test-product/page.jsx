"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function TestProductPage() {
  const images = ["/images/single.webp", "/images/single-1.webp"];
  const [selectedImage, setSelectedImage] = useState("/images/single.webp");
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const accordionItems = [
    {
      title: "When to use & How it works",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
    },
    {
      title: "How To Use",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
    },
    {
      title: "Sizes Available ",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
    },
    {
      title: "Ingredients ",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
    },
    {
      title: "Please read all instructions and warnings carefully before use",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
    },
    {
      title: "F.A.Q",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
    },
  ];

  const heatProducts = [
    {
      name: "Heat Rub",
      image: "/images/heat-brand/1.webp",
    },
    {
      name: "Max Strength",
      image: "/images/heat-brand/2.webp",
    },
    {
      name: "Muscle Massage Roll-on Lotion",
      image: "/images/heat-brand/3.webp",
    },
  ];

  return (
    <main className="w-full mx-auto">
      <section className="py-14 bg-white relative page-width mx-auto">
        <div className="w-[80%] mx-auto grid items-center lg:grid-cols-2 gap-12 text-start">
          <div className="mb-6 flex gap-4">
            <div className="w-[25%] flex flex-col overflow-x-hidden gap-2 lg:gap-4 mt-4 p-2 justify-center">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(image)}
                  className={`lg:w-[100px] aspect-square cursor-pointer border-2 rounded-lg transition-all duration-300 ${
                    image === selectedImage ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <img
                    loading="lazy"
                    src={image}
                    alt="Thumbnail"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            <div className="relative w-[75%] flex justify-center">
              <img
                loading="lazy"
                src={selectedImage}
                alt="Product Image"
                className="w-[75%] block aspect-square rounded-xl shadow-lg transition-all object-contain bg-white border border-gray-100 p-2"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-[#30318C] text-4xl font-bold mb-4">
              Pain Relief Heat Patch
            </h2>
            <p className="text-gray-700 mb-3">pack of 4 single patches</p>
            <p className="font-bold mb-6 text-gray-900">
              Brand: <span className="text-[#EA0029] font-extrabold">Deep Heat</span>
            </p>
            <div className="buttons flex space-x-4">
              <button className="mt-3 cursor-pointer bg-[#DC3B41] hover:bg-[#b52d32] text-white py-2.5 px-8 rounded-full text-sm font-semibold shadow-md transition-colors">
                WHERE TO BUY
              </button>
              <button className="mt-3 cursor-pointer border-[#DC3B41] border-2 text-[#DC3B41] hover:bg-[#DC3B41]/5 py-2.5 px-8 rounded-full text-sm font-semibold transition-colors">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9F9] py-12 page-width mx-auto">
        <h2 className="text-3xl text-center font-bold text-gray-900 mb-8">
          About <span className="text-[#EA0029]">Deep Heat</span> Pain Relief Heat Patch
        </h2>

        <div className="mx-auto w-[80%] max-w-4xl flex flex-col gap-3">
          {accordionItems.map((item, idx) => {
            const isActive = activeFaqIndex === idx;
            return (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <h2>
                  <button
                    onClick={() => setActiveFaqIndex(isActive ? null : idx)}
                    className="flex items-center justify-between w-full p-5 font-semibold text-gray-800 hover:bg-gray-50 transition-colors text-start"
                  >
                    <span className="block text-start flex-1">{item.title}</span>
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
                </h2>
                {isActive && (
                  <div className="p-5 border-t border-gray-100 bg-gray-50 text-gray-600 leading-relaxed text-sm">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col md:flex-row justify-between items-center bg-[#0067B1] hover:bg-[#00348D] w-full page-width mx-auto px-0 transition-colors duration-300">
        <div
          className="w-full md:w-5/12 bg-cover bg-top min-h-[250px] md:min-h-[300px] lg:min-h-[350px]"
          style={{ backgroundImage: "url(/images/brazilshop.webp.webp)" }}
        ></div>
        <div className="w-full md:w-7/12 text-white p-12 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-3">Symptom Checker</h2>
          <p className="text-lg mb-6 opacity-90">Find a suitable product for you</p>
          <Link href="/symptom-checker-v2">
            <button className="bg-[#EA0029] hover:bg-[#c82f33] rounded-full py-3 px-8 text-sm font-semibold cursor-pointer shadow-md transition-colors text-white">
              See More
            </button>
          </Link>
        </div>
      </section>

      <section className="py-12 page-width mx-auto">
        <h2 className="text-center text-3xl font-bold my-8 text-gray-900">
          Discover the power of <span className="text-[#EA0029]">Deep Heat</span>
        </h2>
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {heatProducts.map((product, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="radial-red p-6 flex items-center justify-center h-[200px]">
                  <img
                    loading="lazy"
                    src={product.image}
                    alt={product.name}
                    className="max-h-[160px] object-contain"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between text-start pb-6">
                  <div>
                    <span className="font-light text-xs text-gray-500 uppercase tracking-wider block mb-1">Deep Heat</span>
                    <h2 className="text-xl mb-6 font-bold text-gray-900 line-clamp-2">
                      {product.name}
                    </h2>
                  </div>
                  <button className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full text-sm font-semibold w-fit cursor-pointer shadow-sm">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
