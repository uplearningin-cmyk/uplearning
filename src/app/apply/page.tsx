"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ApplyHero from "../components/apply/ApplyHero";
import ApplicationForm from "../components/apply/ApplicationForm";
import ProgrammeCard from "../components/apply/ProgrammeCard";
import Footer from "../components/Footer";

const LOGO_IMAGE = "/logo-uplearning.svg";

export default function ApplyPage() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Premium Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
          isAtTop ? "bg-slate-900 shadow-none" : "bg-slate-950 shadow-md backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          {/* Logo link back to homepage */}
          <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image
              src={LOGO_IMAGE}
              alt="UpLearning"
              width={260}
              height={50}
              priority
              className="h-auto w-[180px] sm:w-[210px]"
            />
          </a>
          
          <a
            href="/"
            className="text-xs font-bold text-slate-300 hover:text-white transition-colors uppercase tracking-widest border border-slate-700/50 hover:border-slate-500 rounded-full px-4 py-1.5"
          >
            ← Back to Home
          </a>
        </div>
        {/* Brand Accent Top Border */}
        <div 
          className="h-[3px] w-full" 
          style={{ background: "linear-gradient(90deg, var(--brand-yellow), var(--brand-accent))" }} 
        />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-14">
        {/* Hero Section */}
        <ApplyHero />

        {/* Form and Details Grid */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Multi-step Registration Form */}
             <div className="order-2 lg:order-2 space-y-6">
              <ProgrammeCard />
            </div>
            <div className="order-1 lg:order-1">
              <ApplicationForm />
            </div>

            {/* Sidebar Programme details card */}
           
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}