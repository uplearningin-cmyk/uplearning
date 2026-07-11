"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  User, Mail, Phone, Briefcase, GraduationCap, 
  Building2, Sparkles, CheckCircle2, ArrowRight, Loader2 
} from "lucide-react";
import { toast } from "sonner";
import Footer from "../components/Footer";

const LOGO_IMAGE = "/logo-uplearning.svg";
const BACKGROUND_IMAGE = "/hero-background.png";

interface WebinarForm {
  name: string;
  email: string;
  phone: string;
  profession: "student" | "developer" | "employee" | "";
  orgName: string;
  domainOrDegree: string;
}

const INITIAL_FORM_STATE: WebinarForm = {
  name: "",
  email: "",
  phone: "",
  profession: "",
  orgName: "",
  domainOrDegree: "",
};

export default function AwsFreeWebinarPage() {
  const [formData, setFormData] = useState<WebinarForm>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof WebinarForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isAtTop, setIsAtTop] = useState(true);

  // Retrieve WhatsApp Group URL from environment variables or use fallback
  const WHATSAPP_GROUP_URL = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/L1234567890abcdefghijkl";

  // Handle Scroll to toggle header background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle countdown redirection on success
  useEffect(() => {
    if (isSuccess) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Redirect to WhatsApp Group
            window.location.href = WHATSAPP_GROUP_URL;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSuccess, WHATSAPP_GROUP_URL]);

  // Input Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when editing field
    if (formErrors[name as keyof WebinarForm]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof WebinarForm, string>> = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Please enter a valid 10 to 15 digit mobile number";
    }

    if (!formData.profession) {
      errors.profession = "Please select your profession";
    }

    if (!formData.orgName.trim()) {
      const orgLabel = formData.profession === "student" ? "College/University" : "Company/Startup";
      errors.orgName = `${orgLabel} name is required`;
    }

    if (!formData.domainOrDegree.trim()) {
      const domainLabel = formData.profession === "student" ? "Degree/Branch" : "Work domain/Role";
      errors.domainOrDegree = `${domainLabel} is required`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the form errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/aws-free-webinar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        toast.success("Successfully registered for the AWS Free Webinar!");
      } else {
        toast.error(result.error || "Failed to register. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("A network error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic content based on selected profession
  const getDynamicLabels = () => {
    switch (formData.profession) {
      case "student":
        return {
          orgLabel: "College / University Name",
          orgPlaceholder: "e.g., Delhi University",
          orgIcon: <GraduationCap className="h-5 w-5 text-slate-400" />,
          domainLabel: "Degree / Branch",
          domainPlaceholder: "e.g., B.Tech Computer Science",
        };
      case "developer":
        return {
          orgLabel: "Company / Startup Name",
          orgPlaceholder: "e.g., Acme Corp / Freelance",
          orgIcon: <Building2 className="h-5 w-5 text-slate-400" />,
          domainLabel: "Work Domain / Role",
          domainPlaceholder: "e.g., Full Stack / DevOps / Solutions Architect",
        };
      case "employee":
        return {
          orgLabel: "Company Name",
          orgPlaceholder: "e.g., Infosys / Tech Mahindra",
          orgIcon: <Briefcase className="h-5 w-5 text-slate-400" />,
          domainLabel: "Work Domain / Role",
          domainPlaceholder: "e.g., Business Analyst / Project Manager",
        };
      default:
        return {
          orgLabel: "College / Company Name",
          orgPlaceholder: "Select profession first",
          orgIcon: <Building2 className="h-5 w-5 text-slate-400" />,
          domainLabel: "Work Domain / Degree",
          domainPlaceholder: "Select profession first",
        };
    }
  };

  const dynamicLabels = getDynamicLabels();

  return (
    <>
        <div className="min-h-screen bg-white text-black flex flex-col relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt="Webinar background"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 black-grid-overlay opacity-30" />
      </div>

      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
          isAtTop ? "bg-transparent shadow-none" : "bg-black/90 shadow-lg backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image
              src={LOGO_IMAGE}
              alt="UpLearning"
              width={260}
              height={50}
              priority
              className="h-auto w-[180px] sm:w-[210px]"
            />
          </a>
          <a
            href="/"
            className="text-xs font-bold text-slate-300 hover:text-white transition-colors uppercase tracking-widest border border-slate-800 hover:border-slate-600 rounded-full px-4 py-1.5 bg-black/40"
          >
            ← Back to Home
          </a>
        </div>
        <div 
          className="h-[3px] w-full" 
          style={{ background: "linear-gradient(90deg, var(--brand-yellow), var(--brand-accent))" }} 
        />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="mx-auto max-w-6xl w-full px-6 grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Hero / Information Section */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
            
              Limited Seats Available
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              AWS Cloud <span className="text-yellow-400">Free Webinar</span>
            </h1>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              Launch your career in cloud computing. Join our live hands-on webinar to understand core AWS services, architectures, and how to scale applications effectively.
            </p>

            <div className="space-y-4 border-t border-slate-800 pt-6">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">100% Practical Demonstration</h4>
                  <p className="text-sm text-slate-400">See real-time deployments and infrastructure setups on AWS Console.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Q&A session with Experts</h4>
                  <p className="text-sm text-slate-400">Get your doubts clarified by certified AWS Solutions Architects.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Exclusive Resources & Roadmap</h4>
                  <p className="text-sm text-slate-400">Receive free curated resources and a learning blueprint after the webinar.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card Section */}
          <div className="lg:col-span-6 w-full">
            {!isSuccess ? (
              <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 md:p-8 shadow-2xl backdrop-blur-md">
                <h2 className="text-2xl font-bold mb-2">Claim Your Free Seat</h2>
                <p className="text-slate-400 text-sm mb-6">Fill out the quick form below to register and join the official group.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 bg-slate-900 border ${
                          formErrors.name ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition-colors`}
                        placeholder="e.g., John Doe"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-rose-500">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Contact Info (Email & Phone grid) */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2.5 bg-slate-900 border ${
                            formErrors.email ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                          } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition-colors`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-rose-500">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2.5 bg-slate-900 border ${
                            formErrors.phone ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                          } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition-colors`}
                          placeholder="e.g., 9876543210"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-rose-500">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Profession Selection */}
                  <div>
                    <label htmlFor="profession" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Profession
                    </label>
                    <select
                      name="profession"
                      id="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2.5 bg-slate-900 border ${
                        formErrors.profession ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                      } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition-colors`}
                    >
                      <option value="" disabled className="text-slate-500">Select your profession...</option>
                      <option value="student">Student</option>
                      <option value="developer">Developer</option>
                      <option value="employee">Employee</option>
                    </select>
                    {formErrors.profession && (
                      <p className="mt-1 text-xs text-rose-500">{formErrors.profession}</p>
                    )}
                  </div>

                  {/* Dynamic Organization / College Input */}
                  <div>
                    <label htmlFor="orgName" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {dynamicLabels.orgLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {dynamicLabels.orgIcon}
                      </div>
                      <input
                        type="text"
                        name="orgName"
                        id="orgName"
                        disabled={!formData.profession}
                        value={formData.orgName}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 bg-slate-900 border ${
                          formErrors.orgName ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition-colors disabled:opacity-50`}
                        placeholder={dynamicLabels.orgPlaceholder}
                      />
                    </div>
                    {formErrors.orgName && (
                      <p className="mt-1 text-xs text-rose-500">{formErrors.orgName}</p>
                    )}
                  </div>

                  {/* Dynamic Domain / Degree Input */}
                  <div>
                    <label htmlFor="domainOrDegree" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {dynamicLabels.domainLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="domainOrDegree"
                        id="domainOrDegree"
                        disabled={!formData.profession}
                        value={formData.domainOrDegree}
                        onChange={handleChange}
                        className={`block w-full px-4 py-2.5 bg-slate-900 border ${
                          formErrors.domainOrDegree ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition-colors disabled:opacity-50`}
                        placeholder={dynamicLabels.domainPlaceholder}
                      />
                    </div>
                    {formErrors.domainOrDegree && (
                      <p className="mt-1 text-xs text-rose-500">{formErrors.domainOrDegree}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 hover:scale-[1.01] active:scale-95 disabled:opacity-75 disabled:hover:scale-100 gap-2 cursor-pointer shadow-lg shadow-yellow-500/10"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-black" />
                        Registering Seat...
                      </>
                    ) : (
                      <>
                        Register For Free Now
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success / Redirection Screen */
              <div className="rounded-3xl border border-emerald-800/40 bg-slate-950/90 p-8 md:p-10 shadow-2xl text-center space-y-6 backdrop-blur-md animate-fade-in-up">
                <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-white">Registered Successfully!</h2>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Your seat is reserved! You are being automatically redirected to join the official WhatsApp Group in <span className="font-bold text-yellow-400 text-base">{countdown}</span> seconds to get the webinar links and session updates.
                  </p>
                </div>

                {/* Progress bar countdown */}
                <div className="w-full bg-slate-900 rounded-full h-1.5 max-w-xs mx-auto overflow-hidden">
                  <div 
                    className="bg-yellow-400 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  />
                </div>

                <div className="pt-2">
                  <a
                    href={WHATSAPP_GROUP_URL}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-400 transition hover:scale-105 active:scale-95 gap-2"
                  >
                    Join WhatsApp Group Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
    
    </div>
      <Footer />
</>

  );
}
