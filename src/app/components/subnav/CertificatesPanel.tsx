"use client";

import React from "react";
import { motion } from "framer-motion";
import certificate from "../../../../public/certificate.svg";

export default function CertificatesPanel() {
  return (
    <section className="relative z-20 w-full bg-[#020204] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Certification
          </div>

          <div className="space-y-3">
            <h2 className="text-heading-secondary font-semibold text-[var(--brand-yellow)]">
              AWS Cloud Computing Programme Certificate
            </h2>

            <p className="max-w-3xl text-copy text-slate-300">
              Participants who successfully complete the programme,
              practical labs, real-world projects, and the final capstone
              assessment will receive an industry-recognized completion
              certificate jointly presented by <strong>UpLearning</strong> and
              <strong> iRise Academy</strong>.
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <div>
              <p className="text-copy-sm font-semibold text-white">
                Programme Completion
              </p>

              <p className="text-copy-sm text-slate-400">
                Awarded after completing all learning modules and practical
                assessments.
              </p>
            </div>

            <div>
              <p className="text-copy-sm font-semibold text-white">
                Hands-on AWS Labs
              </p>

              <p className="text-copy-sm text-slate-400">
                Practical experience with real AWS services including EC2,
                S3, IAM, VPC, Lambda and more.
              </p>
            </div>

            <div>
              <p className="text-copy-sm font-semibold text-white">
                Capstone Project
              </p>

              <p className="text-copy-sm text-slate-400">
                Build and deploy a complete cloud solution to demonstrate
                your technical expertise.
              </p>
            </div>

            <div>
              <p className="text-copy-sm font-semibold text-white">
                Career Ready
              </p>

              <p className="text-copy-sm text-slate-400">
                Showcase your certificate and project portfolio on your
                resume, LinkedIn, and professional profiles.
              </p>
            </div>

          </div>

          <div className="mt-6 border-t border-white/10 pt-6">

            <p className="text-copy-sm font-semibold text-white">
              Industry Recognition
            </p>

            <p className="mt-3 max-w-2xl text-copy-sm text-slate-400">
              This certificate validates your practical understanding of
              AWS Cloud Computing, cloud infrastructure deployment,
              networking, security fundamentals, and modern DevOps
              practices through hands-on project experience.
            </p>

          </div>

        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[420px]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          

            <img
              src={certificate.src}
              alt="AWS Programme Certificate"
              className="h-auto w-full rounded-lg object-contain"
            />

          
        </motion.div>

      </div>
    </section>
  );
}