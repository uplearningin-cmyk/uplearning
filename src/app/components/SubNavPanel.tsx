"use client";

import React from "react";
import HighlightsPanel from "./subnav/HighlightsPanel";
import CurriculumPanel from "./subnav/CurriculumPanel";
import AdmissionsPanel from "./subnav/CertificatesPanel";
import ImmersionsPanel from "./subnav/ImmersionsPanel";
import EntrepreneurshipPanel from "./subnav/EntrepreneurshipPanel";

import ClassProfilePanel from "./subnav/ClassProfilePanel";

export default function SubNavPanel({ active }: { active: string }) {
  switch (active) {
    case "highlights":
      return <HighlightsPanel />;
    case "curriculum":
      return <CurriculumPanel />;
    case "certification":
      return <AdmissionsPanel />;
    case "immersions":
      return <ImmersionsPanel />;
    case "entrepreneurship":
      return <EntrepreneurshipPanel  />;
    
    default:
      return null;
  }
}
