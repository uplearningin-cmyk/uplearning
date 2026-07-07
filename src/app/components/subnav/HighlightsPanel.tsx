"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Briefcase,
  Award,
  FolderGit2,
  Users,
  Rocket,
} from "lucide-react";

const highlights = [
  {
    icon: Cloud,
    title: "Hands-on AWS Labs",
    description:
      "Work directly with EC2, S3, IAM, VPC, RDS, Lambda and other AWS services through guided practical sessions.",
  },
  {
    icon: Rocket,
    title: "Real Industry Projects",
    description:
      "Build production-style cloud applications and infrastructure that demonstrate your practical skills.",
  },
  {
    icon: Award,
    title: "Certification Preparation",
    description:
      "Prepare confidently for AWS certification exams with structured guidance and practice sessions.",
  },
  {
    icon: FolderGit2,
    title: "Portfolio Development",
    description:
      "Create cloud deployment projects that strengthen your resume and GitHub portfolio.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description:
      "Resume reviews, interview preparation, career guidance, and placement assistance throughout the programme.",
  },
  {
    icon: Users,
    title: "Live Mentorship",
    description:
      "Learn directly from experienced cloud professionals through live sessions, doubt solving, and mentoring.",
  },
];

export default function HighlightsPanel() {
  return (
    <section className="  bg-[#F8FAFC] py-24">

      <div className="container-custom m-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >

          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#FF9900]">
            Programme Highlights
          </p>

          <h2 className="mt-5 text-5xl font-bold leading-tight text-slate-900">
            Everything You Need to Launch
            <br />
            Your Cloud Career
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Learn cloud computing through live sessions, hands-on AWS labs,
            real industry projects, mentorship, certification preparation,
            and career guidance—all in one programme.
          </p>

        </motion.div>

        <div className="mt-20 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

          {highlights.map((item, i) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .6,
                  delay: i * .08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="
                group
                rounded-[32px]
                border
                border-slate-200
                bg-white
                p-8
                shadow-[0_15px_40px_rgba(15,23,42,.06)]
                transition-all
                "
              >

                <div
                  className="
                  flex
                  h-14
                  w-14
                  
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-orange-100
                  to-blue-100
                  transition
                  group-hover:scale-110
                  "
                >

                  <Icon
                    className="text-[#FF9900]"
                    size={28}
                  />

                </div>

                <h3 className="mt-8 text-2xl font-semibold text-slate-900">

                  {item.title}

                </h3>

                <p className="mt-4 leading-8 text-slate-600">

                  {item.description}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}