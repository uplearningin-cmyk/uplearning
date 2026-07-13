"use client";
import { ChevronRight, MoveUpRight} from "lucide-react";
import Footer from "./components/Footer";
import WhyThisProgramme from "./components/WhyThisProgramme";
import SubNavTabs from "./components/SubNavTabs";
import SubNavPanel from "./components/SubNavPanel";



import Image from "next/image";
import { useEffect, useState } from "react";
const iRise = "/iRise.png";
const BACKGROUND_IMAGE = "/hero-background.png";
const DOWNLOAD_IMAGE = "/download.svg";
const LOGO_IMAGE = "/logo-uplearning.svg";
const HERO_GRAPHIC = "/hero-graphic.svg";
const NAV_ITEMS = [
  { label: "Academics", href: "#" },
  { label: "About Us", href: "#" },
];
const cards = [
  {
    title: "Build Startups",
    description:
      "Work on real-world startup ideas and launch products from scratch.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  },
  {
    title: "Learn From Founders",
    description:
      "Get mentorship from entrepreneurs, operators, and investors.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  },
  {
    title: "Industry Projects",
    description:
      "Collaborate with companies and solve practical business problems.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  },
];
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};


const SUBNAV_ITEMS = [
  {
    id: "highlights",
    label: "Highlights",
    title: "Highlights",
    description: "Start programming with our beginner-friendly launch path. This section walks learners through the first steps of building a product, writing code, and bringing a startup idea to life.",
    details: [
      "Begin with practical programming exercises tailored for new coders.",
      "Build real components and projects while learning the fundamentals.",
      "Move from idea to execution with guided lessons and mentor support.",
    ],
  },
  {
    id: "curriculum",
    label: "Curriculum",
    title: "Curriculum",
    description: "Placeholder content for the Curriculum section. Add the curriculum details here as the page develops.",
  },
  {
    id: "certification",
    label: "Certification",
    title: "Certification",
    description: "Placeholder content for Certification. Update this section with the detailed process and criteria later.",
  },
  {
    id: "immersions",
    label: "Audience Profiles",
    title: "Immersions",
    description: "Placeholder content for Immersions. This area is ready for future immersive experience details.",
  },
  {
    id: "entrepreneurship",
    label: "Outcomes",
    title: "Entrepreneurship",
    description: "Placeholder content for Entrepreneurship. Add the entrepreneurship-focused features here later.",
  },
  
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("highlights");

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt="Homepage background"
          fill
          className="object-cover object-center"
          priority
        />
       <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-30 w-full transition-all duration-500 ease-out ${
          isAtTop ? "bg-black/0 shadow-none" : "bg-black/95 shadow-2xl/20 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 lg:px-8">

          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={LOGO_IMAGE}
              alt="UpLearning"
              width={360}
              height={70}
              priority
              className="h-auto w-[250px] md:w-[280px]"
            />
            
            </div>
            
          </div>
             <div className="h-[4px] w-full" style={{ background: 'linear-gradient(90deg, var(--brand-yellow), var(--brand-accent))' }} />

 
      </header>

      <main className="relative z-20 flex min-h-screen items-center justify-center mt-auto">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in-up">
            <p className="mb-2 text-copy-lg font-light text-white">
              UGProgramme in
            </p>
            <h1 className="lg:text-6xl hidden md:block font-bold leading-[1.2] text-white">
              AWS Cloud Computing
            </h1>
             <h1 className="text-3xl md:hidden font-bold leading-[1.2] text-white">
              AWS<br/> Cloud Computing
            </h1>
            <p className="mx-auto mt-[-2rem] mb-[-0rem] max-w-[min(90vw,44rem)] text-copy-sm leading-[.2] text-white/70">
              From "what even is the cloud?" to deploying your own live infrastructure on AWS.
            </p>
            
              
             <p className="mx-auto gap-2 inline-flex mt-[-3rem] max-w-[min(90vw,44rem)] text-copy-sm leading-[.2] text-white">
              In Collabration with 
               <a href="https://irisefoundation.in/">
            <img
              src={iRise}
              alt="iRise Academy"
              priority
              className="h-auto  w-[70px] md:w-[70px]"
            />
            </a>
            </p>
           
          
           <div className="mt-[-1rem] mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
  <a
    href="/aws-free-webinar"
    className="group w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] active:scale-95 sm:px-7 sm:py-3"
  >
    Apply now 
    <MoveUpRight />
  </a>
  <a
    href="#subnav"
    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black active:scale-95 sm:px-7 sm:py-3 gap-2"
  >
    Learn More
    <ChevronRight/>
  </a>
</div>
          </div>
        </div>
      </main>

      
    </div>

<section className="relative z-20  mx-auto w-full bg-black max-w-10xl px-6 pb-8 sm:px-8">
        <div className="mx-auto rounded-[2rem] border border-white/30 bg-black/80 p-4 sm:p-6 shadow-2xl/10 backdrop-blur-xl lg:p-8">
          <div className="grid gap-4 px-2 py-4 sm:gap-6 sm:px-4 sm:py-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:border-l lg:border-r lg:px-0 lg:py-0">
            <div className="space-y-2 p-3 sm:space-y-3 sm:p-4 lg:px-6 lg:py-6">
              <p className="text-caption text-white/50">Duration</p>
              <p className="text-heading-tertiary font-semibold text-white">3 Months</p>
              <p className="text-copy-sm text-white/60">Intensive learning with real-world projects.</p>
            </div>

            <div className="space-y-2 p-3 sm:space-y-3 sm:p-4 lg:px-6 lg:py-6">
              <p className="text-caption text-white/50">Total</p>
              <p className="text-heading-tertiary font-semibold text-white">15+</p>
              <p className="text-copy-sm text-white/60">AWS Services</p>
            </div>

            <div className="space-y-2 p-3 sm:space-y-3 sm:p-4 lg:px-6 lg:py-6">
              <p className="text-caption text-white/50">Get </p>
              <p className="text-heading-tertiary font-semibold text-white">3</p>
              <p className="text-copy-sm text-white/60">Certificate of Excellence</p>
            </div>

            <div className="space-y-2 p-3 sm:space-y-3 sm:p-4 lg:px-6 lg:py-6">
              <p className="text-caption text-white/50">Programme Fees</p>
              <p className="text-heading-tertiary font-semibold text-white">₹4000</p>
              <p className="text-copy-sm text-white/60">Only</p>
            </div>
          </div>
        </div>
      </section>

      <WhyThisProgramme />

     

     

      <section id="subnav" className="sticky top-[60px] z-40 w-full border-t border-white/10 bg-black px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <SubNavTabs
              items={SUBNAV_ITEMS.map((i) => ({ id: i.id, label: i.label }))}
              activeId={activeSection}
              onChange={(id) => setActiveSection(id)}
            />
          </div>

          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <a href="/aws-free-webinar" className="inline-flex w-full max-w-[20rem] items-center justify-center rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-95 lg:max-w-none lg:w-auto">
              Apply Now <span className="ml-2 text-base">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* SubNav content panel separated into its own component */}
      <SubNavPanel active={activeSection} />
      <Footer />
    </div>
  );
}
