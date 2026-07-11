"use client";

import React from "react";
import { Calendar, Award, Cloud, CreditCard, ShieldCheck } from "lucide-react";

export default function ProgrammeCard() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-100/50 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-5 pb-4 border-b border-slate-100">
        Programme Summary
      </h3>

      <div className="space-y-5">
        {/* Fee details */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registration Fees</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold text-slate-900">₹999</span>
              <span className="text-xs font-medium text-slate-500">only </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Full Payment Before Progarmn Starts. </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
            <p className="text-base font-semibold text-slate-800 mt-0.5">3 Months Intensive</p>
            <p className="text-xs text-slate-500">Weekend cohort calls + self-paced labs.</p>
          </div>
        </div>

        {/* AWS Services */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Cloud size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cloud Curriculum</p>
            <p className="text-base font-semibold text-slate-800 mt-0.5">15+ AWS Services Covered</p>
            <p className="text-xs text-slate-500">EC2, S3, RDS, Lambda, DynamoDB, VPC, ECS, etc.</p>
          </div>
        </div>

        {/* Certificates */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Award size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificates</p>
            <p className="text-base font-semibold text-slate-800 mt-0.5">3 Certificates of Excellence</p>
            <p className="text-xs text-slate-500">Upon successful project builds and lab completion.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-3xl">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">What's Included:</h4>
        <ul className="space-y-2">
          {[
            "Interactive live cohort mentorship",
            "Individual AWS Sandbox environments",
            "Capstone Startup Portfolio builder",
            "Exclusive Slack peer community access",
            "1-on-1 resume reviews and mock interviews",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
