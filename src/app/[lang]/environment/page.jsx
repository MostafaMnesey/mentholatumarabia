"use client";
import React from "react";
import BlogsSection from "@/components/BlogsSection";

export default function EnvironmentPage() {
  return (
    <>
      <section
        className="w-full h-[85vh] bg-center bg-cover relative"
        style={{ backgroundImage: "url(https://cdn.mentholatumarabia.com/images/imgs/1%20(1).webp)" }}
      >
        <div className="layer w-full page-width mx-auto h-[85vh] bg-[rgba(0,0,0,.2)] flex justify-center items-center">
          <h1 className="text-white text-5xl font-bold">Environment</h1>
        </div>
        <div
          className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto card bg-white rounded-xl p-6 sm:p-8 md:p-12 absolute left-1/2 -translate-x-1/2 shadow-lg"
          style={{ top: "calc(95% - 60px)" }}
        >
          <p className="text-sm sm:text-base mb-2 text-gray-700 leading-relaxed">
            <span className="text-[#003DA6] font-semibold">Mentholatum</span> has
            specialised in family healthcare for more than 130 years and our
            commitment to sustainability is at the heart of our culture. We understand
            that the choices we make today will impact the future of our planet for
            generations. That’s why we strive to reduce our environmental footprint
            year after year and aim to tread gently. We know our journey continues to
            create the very best working practices that care and love for mother
            nature, for the future and beyond.
          </p>
        </div>
      </section>
      
      <main className="w-full">
        <section className="bg-[#003DA60F] rounded-t-4xl py-10 mt-64 sm:mt-56 md:mt-40 relative">
          <div className="w-[80%] mx-auto page-width relative z-10">
            <h2 className="text-[#003DA6] text-3xl mb-4 font-bold">SOCIAL</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-8">
              <div className="flex flex-col gap-6 text-gray-700">
                <div className="flex space-x-4">
                  <img
                    loading="lazy"
                    src="https://cdn.mentholatumarabia.com/images/imgs/Group%201000001975.webp"
                    className="w-8 h-8 rounded-lg object-contain"
                    alt=""
                  />
                  <p className="leading-relaxed">
                    We work with several worthy local charities – The Scottish
                    Association for Mental Health (SAMH) and Kilbryde Hospice, to help
                    improve the lives of people in our community. We contribute our
                    time as well as money raised through internal fund-raising events
                    and company donations.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <img
                    loading="lazy"
                    src="https://cdn.mentholatumarabia.com/images/imgs/Group%201000001975.webp"
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="leading-relaxed">
                    We also support our wider society. Back pain is a huge problem in
                    the UK and something the team here are passionate to help with. We
                    designed and run a national public health campaign “Mind Your
                    Back” – which is a free programme to help sufferers, self-manage
                    their backpain on a daily basis:{" "}
                    <a
                      href="https://www.mindyourbackuk.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#003DA6] hover:underline"
                    >
                      www.mindyourbackuk.com
                    </a>
                  </p>
                </div>
                <div className="flex space-x-4">
                  <img
                    loading="lazy"
                    src="https://cdn.mentholatumarabia.com/images/imgs/Group%201000001975.webp"
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="leading-relaxed">
                    We take our social responsibility seriously and in all aspects of
                    our business internally and externally, we are mindful of human
                    rights and nurture a culture of inclusivity, diversity and
                    equality. Our company is committed to paying all staff the
                    Scottish living wage as a minimum and is an accredited employer.
                    We are also “Investors In People” Silver accredited, reflecting
                    the importance we place on supporting and developing our team.
                  </p>
                </div>
              </div>
              <div>
                <img
                  loading="lazy"
                  src="https://cdn.mentholatumarabia.com/images/imgs/2%20(3).webp"
                  className="w-full rounded-3xl relative z-10 shadow-md"
                  alt=""
                />
              </div>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.mentholatumarabia.com/images/imgs/Vector%20(12).webp"
            className="absolute z-0 end-0 bottom-0 w-1/6 rounded-xl pointer-events-none opacity-45"
            alt=""
          />
        </section>

        <section className="py-12 my-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-[80%] mx-auto gap-8 items-center">
            <div>
              <img
                loading="lazy"
                src="https://cdn.mentholatumarabia.com/images/imgs/3%20(1).webp"
                className="w-full rounded-2xl shadow-md"
                alt=""
              />
            </div>
            <div className="text-gray-700">
              <h2 className="text-[#003DA6] text-3xl mb-4 font-bold">HEALTH</h2>
              <p className="pt-3 leading-relaxed">
                As a healthcare company we are passionate about the health of both our
                colleagues and our customers. Our mission is to encourage and inspire
                everyone to lead a healthy and happy life and play their part in
                taking care of themselves. We have a number of campaigns and social
                sites designed to educate and help people gain the knowledge and
                confidence to self-care and take more responsibility for their own
                health, helping ease the pressure on our NHS resources. Internally we
                have ongoing health seminars, relating to physical and mental health
                as well as support for colleagues to achieve their goals. Our
                wellbeing initiatives and programmes have earned us accreditation from
                “Healthy Working Lives” a programme backed by the NHS.
              </p>
            </div>
          </div>
        </section>

        <BlogsSection />
      </main>
    </>
  );
}
