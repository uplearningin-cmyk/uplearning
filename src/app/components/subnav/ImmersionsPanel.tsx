"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const audienceProfiles = [
  {
    id: "students",
    title: "Students",
    description:
      "Build practical cloud computing skills beyond classroom learning through hands-on AWS labs and real-world deployments.",
    idealFor: [
      "B.Tech Students",
      "BCA & MCA Students",
      "B.Sc IT / CS Students",
      "Engineering Students",
    ],
    gains: [
      "Cloud Fundamentals",
      "Hands-on AWS Experience",
      "Industry Projects",
      "Career Readiness",
    ],
  },

  {
    id: "graduates",
    title: "Fresh Graduates",
    description:
      "Bridge the gap between academic knowledge and industry expectations with practical AWS experience.",
    idealFor: [
      "Recent Graduates",
      "Job Seekers",
      "Career Starters",
      "Internship Aspirants",
    ],
    gains: [
      "Deployment Experience",
      "Resume Projects",
      "Interview Preparation",
      "Portfolio Development",
    ],
  },

  {
    id: "developers",
    title: "Developers",
    description:
      "Expand your software development skills by learning cloud-native application deployment and AWS architecture.",
    idealFor: [
      "Frontend Developers",
      "Backend Developers",
      "Full Stack Developers",
      "Software Engineers",
    ],
    gains: [
      "Cloud Deployment",
      "Docker Basics",
      "Serverless Applications",
      "CI/CD Workflows",
    ],
  },

  {
    id: "devops",
    title: "Future DevOps Engineers",
    description:
      "Learn modern DevOps practices including automation, monitoring, containers, and cloud infrastructure.",
    idealFor: [
      "DevOps Beginners",
      "Infrastructure Engineers",
      "Automation Enthusiasts",
      "Cloud Aspirants",
    ],
    gains: [
      "CI/CD Pipelines",
      "Infrastructure Basics",
      "Cloud Monitoring",
      "Automation Skills",
    ],
  },

  {
    id: "career-switchers",
    title: "Career Switchers",
    description:
      "Transition into high-demand cloud computing careers with structured learning and guided projects.",
    idealFor: [
      "Working Professionals",
      "Career Changers",
      "IT Support Engineers",
      "Tech Enthusiasts",
    ],
    gains: [
      "Cloud Career Path",
      "Practical Experience",
      "Certification Readiness",
      "Industry Guidance",
    ],
  },

  {
    id: "certification",
    title: "AWS Certification Aspirants",
    description:
      "Prepare confidently for AWS certification exams while gaining practical implementation experience.",
    idealFor: [
      "Certification Candidates",
      "Cloud Learners",
      "Working Professionals",
      "Students",
    ],
    gains: [
      "AWS Best Practices",
      "Hands-on Labs",
      "Mock Assessments",
      "Certification Preparation",
    ],
  },
];
export default function ImmersionsPanel() {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".join-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.05,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative z-20 w-full bg-[#020204] px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-3">
            <p className="text-caption text-slate-500">
  Who Should Join?
</p>

<h2 className="text-heading-secondary font-semibold text-white">
  Designed for Future Cloud Professionals
</h2>

<p className="max-w-3xl text-copy text-slate-300">
  Whether you're a student beginning your cloud journey, a developer
  expanding your skills, or a working professional transitioning into
  cloud computing, this programme provides the practical knowledge,
  industry projects, and AWS experience needed to build a successful
  career.
</p>          </div>

         
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audienceProfiles.map((profile) => (
            <article
              key={profile.id}
              className="join-card rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
               
                <div>
                  <h3 className="text-heading-tertiary font-semibold text-white">{profile.title}</h3>
                  <p className="mt-2 text-copy-sm text-slate-400">{profile.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 text-slate-300 sm:grid-cols-2">
                <div>
                  <p className="text-caption text-slate-500">Ideal for</p>
                  <ul className="mt-3 space-y-2 text-copy-sm leading-6">
                    {profile.idealFor.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-caption text-slate-500">What you’ll gain</p>
                  <ul className="mt-3 space-y-2 text-copy-sm leading-6">
                    {profile.gains.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
