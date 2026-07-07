"use client";

import React from "react";
import Image from "next/image";

export default function ApplyHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-purple-50/40 to-white px-6 pt-24 pb-12 text-center md:pt-32 md:pb-16 border-b border-slate-100">
      {/* Decorative blurred background shapes */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl animate-fade-in-up">
        {/* AWS Badge */}
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-semibold text-purple-700 shadow-sm shadow-purple-100/50">
          <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
          AWS Cohort
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:leading-[1.15]">
          Secure Your Spot in the <br />
          <span className="bg-gradient-to-r from-yellow-600 to-purple-900 bg-clip-text text-transparent">
            AWS Cloud Computing Programme 
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 md:text-lg leading-relaxed">
          From foundational cloud architecture to deploying live production apps. 
          Fill out the form below, complete the UPI payment, and enter your UTR to start your cloud journey.
        </p>
      </div>
    </div>
  );
}
