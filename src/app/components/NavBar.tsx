"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Highlights", href: "#highlights" },
  { label: "Contact", href: "#contact" },
];

const LOGO_IMAGE = "/logo.png"; // Change to your logo

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500`}
      >
        <div
          className={`mx-auto mt-3 flex h-16 w-[95%] max-w-7xl items-center justify-between rounded-2xl border px-5 transition-all duration-500 md:h-[72px] md:px-8

          ${
            scrolled
              ? "border-white/10 bg-black/65 shadow-[0_10px_40px_rgba(0,0,0,.35)] backdrop-blur-2xl"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}

          <a href="/" className="flex items-center">
            <Image
              src={LOGO_IMAGE}
              alt="UpLearning"
              width={220}
              height={60}
              priority
              className="w-[135px] sm:w-[160px] md:w-[190px] lg:w-[210px]"
            />
          </a>

          {/* Desktop */}

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-[15px] font-medium text-white/80 transition duration-300 hover:text-white"
              >
                {item.label}

                <span
                  className="
                  absolute
                  left-0
                  -bottom-1
                  h-[2px]
                  w-0
                  bg-[#FF9900]
                  transition-all
                  duration-300
                  group-hover:w-full
                  "
                />
              </a>
            ))}
          </nav>

          {/* Right */}

          <div className="hidden items-center gap-4 lg:flex">
            <button
              className="
              group
              flex
              items-center
              gap-2
              rounded-full
              bg-[#FF9900]
              px-6
              py-3
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(255,153,0,.45)]
              "
            >
              Apply Now

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Mobile */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 text-white transition hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <nav className="flex flex-col gap-8">
                {NAV_ITEMS.map((item) => (
                 <a
  key={item.label}
  href={item.href}
  className="group relative text-[15px] font-medium text-white/80 transition duration-300 hover:text-white"
>
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                className="
                mt-12
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#FF9900]
                py-4
                text-lg
                font-semibold
                text-black
                "
              >
                Apply Now
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}