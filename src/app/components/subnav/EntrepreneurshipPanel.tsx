"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillAreas = [
  {
    id: "cloud",
    title: "Cloud Computing",
    bullets: [
      "Cloud Fundamentals",
      "AWS Global Infrastructure",
      "Virtual Machines (EC2)",
      "Cloud Storage (S3)",
      "Networking Basics",
    ],
    accent: "bg-[rgba(255,153,0,0.14)] text-[#FF9900]",
  },
  {
    id: "aws",
    title: "AWS Services",
    bullets: [
      "IAM",
      "VPC",
      "RDS",
      "Lambda",
      "CloudWatch",
    ],
    accent: "bg-[rgba(37,99,235,0.14)] text-blue-600",
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    bullets: [
      "Docker",
      "CI/CD Pipelines",
      "Infrastructure Basics",
      "Deployment Automation",
      "Monitoring",
    ],
    accent: "bg-[rgba(16,185,129,0.14)] text-emerald-600",
  },
  {
    id: "career",
    title: "Career Preparation",
    bullets: [
      "Industry Projects",
      "AWS Certification Prep",
      "Resume Building",
      "Mock Interviews",
      "Portfolio Development",
    ],
    accent: "bg-[rgba(168,85,247,0.14)] text-violet-600",
  },
];
export default function EntrepreneurshipPanel() {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".skill-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative z-20 w-full bg-slate-50 px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Master In-Demand Cloud Skills</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900">
              Build the technical skills companies expect from modern Cloud and DevOps professionals.
            </h2>
            <p className="max-w-5xl text-base leading-8 text-slate-600">
          From cloud fundamentals and AWS services to DevOps, automation,
security, and real-world deployments, you'll gain practical experience
that prepares you for internships, certifications, and cloud careers.  </p>
          </div>

          
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillAreas.map((area) => (
            <article
              key={area.id}
              className="skill-card rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${area.accent} ring-1 ring-inset ring-slate-200`}>
                    {area.title}
                  </p>
                  <p className="mt-5 text-sm text-slate-600 leading-7">
                    {area.title === "Future Skills"
                      ? "Prepare your venture with digital systems, automation, and tools that scale with your growth."
                      : area.title === "Brand Skills"
                      ? "Build a clear brand identity that connects with customers and supports long-term growth."
                      : area.title === "Business Skills"
                      ? "Learn the systems, planning, and customer habits that make a business repeatable and resilient."
                      : "Develop the mindset, judgment, and ownership habits needed to take ideas from concept to launch."}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 text-sm leading-6 text-slate-700">
                {area.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 rounded-3xl bg-slate-50 px-4 py-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-400" />
                    <p>{bullet}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
