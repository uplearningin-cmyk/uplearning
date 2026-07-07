"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

export default function WhyThisProgramme() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <section className="relative z-20 overflow-hidden bg-[#040404] px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <p className="absolute right-0 top-12 -mr-10 whitespace-nowrap text-[clamp(5rem,10vw,12rem)] font-black uppercase tracking-[0.45em] text-white/5 italic leading-none">
          uplearning
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={container}
          className="relative z-10 text-center lg:text-left"
        >
          <motion.div variants={item} className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-caption font-semibold text-white/80 shadow-sm shadow-black/20">
            Why this programme exists
          </motion.div>

          <motion.h2 variants={item} className="max-w-3xl text-heading-primary leading-tight text-white">
            How you actually learn at UpLearning?
          </motion.h2>

          <motion.p variants={item} className="mt-6 max-w-2xl text-copy-lg text-white/70">
            Today's education introduces cloud computing. The industry expects professionals who can confidently design, deploy, and manage cloud infrastructure.
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-2xl text-copy-lg text-white/70">
            The AWS Cloud Computing Industry Graduate Programme, offered by UpLearning × iRise Academy, bridges this gap through hands-on learning, live AWS environments, and real-world projects.   </motion.p>

          <motion.p variants={item} className="mt-5 max-w-2xl text-copy-lg text-white/70">
          Participants don't just study AWS—they build scalable cloud solutions, automate deployments, strengthen security, and gain practical experience that prepares them for certifications and cloud careers.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex w-full justify-center gap-4 sm:flex-row sm:items-center lg:justify-start">
            <a
              href="#subnav"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-base font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(255,255,255,0.12)] sm:w-auto"
            >
              Explore Curriculum
              <span className="ml-3 text-xl">↗</span>
            </a>
           
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[560px] mt-8 lg:mt-0"
        >
          
          
           
              <Image
                src="/image.jpg"
                alt="Students working in a group"
                width={960}
                height={820}
                className=" hidden md:block h-auto rounded-[0.5rem] w-full object-cover"
                priority
              />

              
            

          
        </motion.div>
      </div>
    </section>
  );
}
