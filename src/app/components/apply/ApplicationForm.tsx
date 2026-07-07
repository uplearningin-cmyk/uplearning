"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, MapPin,
  BookOpen, Calendar, CreditCard,
  ArrowRight, ArrowLeft, CheckCircle2,
  AlertCircle, Loader2, Sparkles, Copy, Check
} from "lucide-react";
import QRCode from "qrcode";
import { toast } from "sonner";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  city: string;
  college: string;
  course: string;
  year: string;
  utr: string;
}

const INITIAL_FORM_STATE: FormFields = {
  name: "",
  email: "",
  phone: "",
  city: "",
  college: "",
  course: "",
  year: "",
  utr: "",
};

export default function ApplicationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Partial<FormFields>>({});
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [countdown, setCountdown] = useState(5);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const MERCHANT_UPI_ID = process.env.NEXT_PUBLIC_MERCHANT_UPI_ID;
  const PROGRAMME_FEE = process.env.NEXT_PUBLIC_PROGRAMME_FEE;

  // Generate UPI QR Code URL
  useEffect(() => {
    if (currentStep === 3) {
      const upiUrl = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=UpLearning&am=${PROGRAMME_FEE}&cu=INR&tn=AWS%20Cloud%20Computing%20Registration`;
      QRCode.toDataURL(upiUrl, {
        width: 250,
        margin: 2,
        color: {
          dark: "#0F172A", // slate-900
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => {
          console.error("Failed to generate QR Code:", err);
          toast.error("Failed to generate UPI QR Code. Please use the UPI ID directly.");
        });
    }
  }, [currentStep]);

  // Countdown timer for redirection in Step 4 (Success)
  useEffect(() => {
    if (currentStep === 4 && submissionResult) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep, submissionResult, router]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name as keyof FormFields]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Field Validation Helper
  const validateStep = (step: number): boolean => {
    const errors: Partial<FormFields> = {};

    if (step === 1) {
      if (!formData.name.trim()) errors.name = "Full name is required";
      if (!formData.email.trim()) {
        errors.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
      } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
        errors.phone = "Please enter a valid 10-digit mobile number";
      }
      if (!formData.city.trim()) errors.city = "City is required";
    }

    if (step === 2) {
      if (!formData.college.trim()) errors.college = "College name is required";
      if (!formData.course.trim()) errors.course = "Course/Degree is required";
      if (!formData.year) errors.year = "Please select your academic year";
    }

    if (step === 3) {
      if (!formData.utr.trim()) {
        errors.utr = "UTR / Transaction ID is required";
      } else if (!/^[a-zA-Z0-9]{6,22}$/.test(formData.utr.trim())) {
        errors.utr = "Enter a valid alphanumeric UTR code (6-22 characters)";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast.error("Please correct the errors in the form before proceeding.");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(MERCHANT_UPI_ID);
    setCopiedUpi(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      toast.error("Please enter a valid UTR code to submit.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionResult(result.data);
        setCurrentStep(4);
        toast.success("Registration details submitted successfully!");
      } else {
        toast.error(result.error || "Failed to submit registration. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error occurred. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 md:p-8 shadow-xl shadow-slate-100/50 backdrop-blur-sm relative">
      {/* Progress Header */}
      {currentStep < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span>Step {currentStep} of 3</span>
            <span>
              {currentStep === 1 && "Personal Info"}
              {currentStep === 2 && "Academic Details"}
              {currentStep === 3 && "Payment Verification"}
            </span>
          </div>
          {/* Progress bar tracks */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
              initial={{ width: "33.3%" }}
              animate={{ width: `${currentStep * 33.3}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-5"
          >
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Personal Information</h2>
              <p className="text-xs text-slate-500 mt-1">Provide your primary contact details so we can reach you.</p>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full rounded-2xl border ${formErrors.name ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                />
              </div>
              {formErrors.name && (
                <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                  <AlertCircle size={12} /> {formErrors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className={`w-full rounded-2xl border ${formErrors.email ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                />
              </div>
              {formErrors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                  <AlertCircle size={12} /> {formErrors.email}
                </p>
              )}
            </div>

            {/* Phone & City Inputs (Grid) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Phone Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`w-full rounded-2xl border ${formErrors.phone ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                    <AlertCircle size={12} /> {formErrors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="city" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">City / Location</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className={`w-full rounded-2xl border ${formErrors.city ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                  />
                </div>
                {formErrors.city && (
                  <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                    <AlertCircle size={12} /> {formErrors.city}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-600 to-purple-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all cursor-pointer"
              >
                Continue to Academics <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-5"
          >
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Academic Profiles</h2>
              <p className="text-xs text-slate-500 mt-1">Tell us about your educational background.</p>
            </div>

            {/* College Input */}
            <div className="space-y-1.5">
              <label htmlFor="college" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">College / University</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <BookOpen size={16} />
                </span>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="IIT Bombay / Delhi University"
                  className={`w-full rounded-2xl border ${formErrors.college ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                />
              </div>
              {formErrors.college && (
                <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                  <AlertCircle size={12} /> {formErrors.college}
                </p>
              )}
            </div>

            {/* Course & Year Inputs */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="course" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Course / Degree</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                    <BookOpen size={16} />
                  </span>
                  <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="B.Tech Computer Science"
                    className={`w-full rounded-2xl border ${formErrors.course ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                  />
                </div>
                {formErrors.course && (
                  <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                    <AlertCircle size={12} /> {formErrors.course}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="year" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Current Year</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                    <Calendar size={16} />
                  </span>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border ${formErrors.year ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 appearance-none outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                  >
                    <option value="" disabled>Select Academic Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduated">Graduated / Alumnus</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
                    ▼
                  </span>
                </div>
                {formErrors.year && (
                  <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                    <AlertCircle size={12} /> {formErrors.year}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 active:scale-95 transition-all cursor-pointer"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-600 to-purple-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all cursor-pointer"
              >
                Go to Payment <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Payment & UTR Verification</h2>
              <p className="text-xs text-slate-500 mt-1">Scan the UPI QR code below to complete the payment of ₹4,000.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-center">
              {/* QR Code Graphic Column */}
              <div className="flex flex-col items-center justify-center border border-slate-100 rounded-3xl bg-slate-50/50 p-4 md:p-6 text-center">
                {qrCodeUrl ? (
                  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-md">
                    <img
                      src={qrCodeUrl}
                      alt="UPI QR Code to Pay ₹4000"
                      className="h-[180px] w-[180px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-[180px] w-[180px] flex items-center justify-center text-slate-400">
                    <Loader2 size={36} className="animate-spin" />
                  </div>
                )}

                <p className="text-xs font-bold text-slate-700 mt-4 uppercase tracking-wider">
                  Scan to Pay ₹4,000
                </p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                  Use GPay, PhonePe, Paytm, BHIM, or any banking app.
                </p>

                {/* Direct UPI ID backup */}
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-1.5">
                  <span className="text-[11px] font-mono text-slate-600 font-bold select-all">{MERCHANT_UPI_ID}</span>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="text-slate-400 hover:text-purple-600 transition-colors p-1"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* UTR Input Instructions Column */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-amber-200/60 bg-amber-50/20 p-4 text-xs leading-relaxed text-amber-800">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Sparkles size={14} className="text-amber-500" />
                    How to verify payment:
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 mt-1 font-medium text-slate-600">
                    <li>Scan the QR and pay ₹4,000.</li>
                    <li>Find the <strong>12-digit UTR</strong> / Transaction Reference ID in your app.</li>
                    <li>Paste it in the verification field below.</li>
                  </ol>
                </div>

                {/* UTR Input Field */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-1.5">
                    <label htmlFor="utr" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">UTR / Transaction ID</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                        <CreditCard size={16} />
                      </span>
                      <input
                        type="text"
                        id="utr"
                        name="utr"
                        value={formData.utr}
                        onChange={handleChange}
                        placeholder="e.g. 618294810294"
                        className={`w-full rounded-2xl border ${formErrors.utr ? 'border-red-400 bg-red-50/10 focus:ring-red-200' : 'border-slate-200/90 bg-white focus:ring-purple-200'} py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-purple-500 transition-all`}
                      />
                    </div>
                    {formErrors.utr && (
                      <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={12} /> {formErrors.utr}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 hover:from-purple-700 hover:to-indigo-700 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <CheckCircle2 size={16} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && submissionResult && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-6 text-center space-y-6"
          >
            {/* Animated Check */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
            >
              <CheckCircle2 size={40} />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">Registration Complete!</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for applying, <strong className="text-slate-800">{submissionResult.name}</strong>. Your registration details have been securely recorded.
              </p>
            </div>

            {/* Recoded Details Card */}
            <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                <span className="font-semibold text-slate-500">Application ID</span>
                <span className="font-bold text-purple-700 font-mono">{submissionResult.applicationId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                <span className="font-semibold text-slate-500">Timestamp</span>
                <span className="font-medium text-slate-800">{submissionResult.timestamp}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                <span className="font-semibold text-slate-500">Payment UTR</span>
                <span className="font-bold text-slate-800 font-mono">{submissionResult.utr}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                <span className="font-semibold text-slate-500">Verification Status</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-bold text-amber-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
                  {submissionResult.status}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We are verifying your transaction reference manually. Verification details will be sent to <strong>{submissionResult.email}</strong> within 1-2 hours.
            </div>

            {/* Redirect Countdown Indicator */}
            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
              <Loader2 size={14} className="animate-spin text-purple-600" />
              Returning to main page in {countdown} seconds...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
