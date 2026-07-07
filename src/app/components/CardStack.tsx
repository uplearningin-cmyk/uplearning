"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "01",
    heading: "Build While Learning",
    description:
      "Most entrepreneurship programmes focus heavily on theory and leave implementation for later. In this programme, learning and execution happen simultaneously.",
    features: [
      "Learn through practical implementation",
      "Apply concepts directly to your startup",
      
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    bg: "#ffffff",
  },
  {
    title: "02",
    heading: "Startup-First Curriculum",
    description:
      "Traditional business education is often designed around corporate management. This programme is built specifically for aspiring founders, builders, creators, and innovators.",
    features: [
      "Founder-focused learning journey",
      "Startup-specific frameworks",
      
    ],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    bg: "#f8f8f8",
  },
  {
    title: "03",
    heading: "Real Founder Frameworks",
    description:
      "Participants gain access to practical systems, tools, and frameworks commonly used by startups to make decisions, validate opportunities, understand customers, and create sustainable businesses.",
    features: [
      "Startup validation frameworks",
      "Customer discovery systems",
      
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    bg: "#f4f4f4",
  },
  {
    title: "04",
    heading: "Community-Based Learning",
    description:
      "Entrepreneurship can often feel like a lonely journey. This programme creates an environment where participants learn alongside ambitious students, creators, builders, and aspiring founders.",
    features: [
      "Founder community access",
      "Collaborative learning environment",
      
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    bg: "#f0f0f0",
  },
  {
    title: "05",
    heading: "AI-Powered Entrepreneurship",
    description:
      "Artificial Intelligence is reshaping how modern businesses are built and scaled. Founders who understand AI can work faster, automate repetitive tasks, and create more efficient operations.",
    features: [
      "AI tools for founders",
      "Automation fundamentals",
      
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    bg: "#ececec",
  },
  {
    title: "06",
    heading: "Startup Showcase Opportunity",
    description:
      "Building a startup is one thing; presenting it to the world is another. Selected participants may receive opportunities to showcase their startup concepts, projects, products, or brands.",
    features: [
      "Startup presentations",
      "Founder pitch opportunities",
      
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
    bg: "#e8e8e8",
  },
  {
    title: "07",
    heading: "Lifetime Builder Network",
    description:
      "The programme does not end after the final session. Participants become part of Uplearning's growing ecosystem of founders, innovators, students, communities, and startup enthusiasts.",
    features: [
      "Founder ecosystem access",
      "Long-term networking opportunities",
      
    ],
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80",
    bg: "#e4e4e4",
  },
];

export default function CardStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stackCards = gsap.utils.toArray<HTMLElement>(".stack-card");

    gsap.set(stackCards.slice(1), {
      yPercent: 100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${stackCards.length * 1200}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    stackCards.slice(1).forEach((card, index) => {
      tl.to(
        card,
        {
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
        },
        index
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen py-80 overflow-hidden"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="stack-card   absolute inset-0"
          style={{
            zIndex: index + 1,
          }}
        >
          <div className="h-auto w-full flex items-center  justify-center  md:p-6 lg:p-8">
            <div className="w-full  max-w-8xl rounded-[32px] bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_15px_40px_rgba(0,0,0,0.12)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2  min-h-[auto] md:min-h-[680px]">
                 <div className=" relative  h-[260px] md:h-[360px] lg:h-auto">
                  <img
                    src={card.image}
                    alt={card.heading}
                    className="absolute  inset-0 w-full h-full object-cover"
                  />

                {/* Content */}
                <div className="  lg:p-16 rounded-[40px] flex flex-col justify-center">
                  <span className="text-caption text-gray-500">
                    {card.title}
                  </span>

                  <h2 className="mt-6 text-heading-secondary font-light leading-tight text-gray-900">
                    {card.heading}
                  </h2>

                

                  <div className="mt-8 space-y-4">
                    {card.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
                        <span className="text-gray-700 text-copy-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image */}
               
              </div>
            </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}