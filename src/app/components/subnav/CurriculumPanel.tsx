"use client";

import { motion } from "framer-motion";

const curriculum = [
  {
    week: "Month 1 — Cloud Foundations & AWS Core Services",
    tagline:
      "Build a strong foundation in cloud computing and master the core AWS services used by modern organizations.",
    description:
      "Participants begin by understanding cloud computing concepts, AWS global infrastructure, Identity & Access Management, networking, storage, and compute services while deploying their first cloud resources.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    alt: "Students learning AWS cloud fundamentals",
    topics: [
      "Cloud Computing Fundamentals",
      "AWS Global Infrastructure",
      "IAM & Security Basics",
      "Amazon EC2",
      "Amazon S3",
      "Elastic Load Balancer",
      "Auto Scaling",
      "Amazon VPC",
    ],
    outcomes: [
      "Deploy Virtual Servers",
      "Configure Secure Cloud Storage",
      "Build Virtual Networks",
      "Host Your First AWS Application",
    ],
  },

  {
    week: "Month 2 — Cloud Architecture, DevOps & Automation",
    tagline:
      "Design scalable cloud infrastructure and automate deployments using DevOps practices.",
    description:
      "Learn how production cloud environments are built using infrastructure as code, CI/CD pipelines, monitoring, containers, and serverless computing.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
    alt: "Cloud architecture and DevOps workflow",
    topics: [
      "AWS Lambda",
      "Amazon RDS",
      "CloudFormation Basics",
      "Docker Fundamentals",
      "CI/CD Pipelines",
      "CloudWatch Monitoring",
      "SNS & SQS",
      "Route 53",
    ],
    outcomes: [
      "Deploy Serverless Applications",
      "Build Automated CI/CD Pipelines",
      "Monitor Cloud Infrastructure",
      "Deploy Production Workloads",
    ],
  },

  {
    week: "Month 3 — Security, Real Projects & Career Preparation",
    tagline:
      "Apply your skills by building real-world cloud solutions while preparing for AWS certifications and interviews.",
    description:
      "The final phase focuses on cloud security, architecture best practices, cost optimization, capstone projects, resume building, mock interviews, and certification preparation.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    alt: "Team collaborating on cloud deployment project",
    topics: [
      "AWS Security Best Practices",
      "Encryption & IAM Policies",
      "AWS Well-Architected Framework",
      "Cost Optimization",
      "Capstone Project",
      "Resume & LinkedIn",
      "Mock Interviews",
      "AWS Certification Preparation",
    ],
    outcomes: [
      "Complete Industry Capstone Project",
      "Certification Readiness",
      "Industry Portfolio",
      "Job Interview Preparation",
    ],
  },
];

export default function CurriculumPanel() {
  return (
    <section className="relative z-20 overflow-hidden bg-[#020204] px-6 py-16 lg:px-12 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="text-caption text-[var(--brand-yellow)]">
  Programme Curriculum
</p>

<h2 className="mt-4 text-heading-secondary font-semibold text-white leading-tight">
  Learn AWS Through Real Industry Projects
</h2>

<p className="mt-4 text-copy-lg text-slate-300 max-w-2xl">
  A structured three-month learning journey covering cloud fundamentals,
  AWS services, DevOps, security, real-world deployments, and career
  preparation—designed to make you industry-ready.
</p>
        </div>

        <div className="space-y-16">
          {curriculum.map((item, i) => (
            <motion.div
              key={item.week}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className={`grid gap-8 items-center ${i % 2 === 0 ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.2fr]"}`}
            >
              <div className={`${i % 2 === 0 ? "order-1" : "order-2"}`}>
                <div className="mb-4 inline-flex items-center gap-4">
                  <span className="inline-block h-3 w-3 rounded-full bg-[var(--brand-yellow)]" />
                  <span className="text-xs uppercase tracking-[0.28em] text-slate-300">{item.week}</span>
                </div>

                <h3 className="text-heading-tertiary font-semibold text-white">{item.tagline}</h3>
                <p className="mt-4 text-copy text-slate-300 max-w-2xl">{item.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/8 bg-black/40 p-5">
                    <p className="text-caption text-yellow-300">Topics</p>
                    <ul className="mt-4 space-y-2 text-copy-sm text-slate-300">
                      {item.topics.slice(0, 4).map((t) => (
                        <li key={t} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-400" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[20px] border border-white/8 bg-black/40 p-5">
                    <p className="text-caption text-cyan-300">Outcomes</p>
                    <ul className="mt-4 space-y-2 text-copy-sm text-slate-300">
                      {item.outcomes.slice(0, 4).map((o) => (
                        <li key={o} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <motion.div
                className={`${i % 2 === 0 ? "order-2" : "order-1"} rounded-[20px] overflow-hidden bg-slate-900`} 
                initial={{ scale: 0.98, opacity: 0.9 }}
                whileInView={{ scale: 1.02, opacity: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.9 }}
              >
                <img src={item.image} alt={item.alt} className="w-full h-[360px] object-cover" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
