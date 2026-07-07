import type { Metadata } from "next";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  metadataBase: new URL("https://uplearning.vercel.app/"),

  title: {
    default: "UpLearning | Startup Builder Programme",
    template: "%s | UpLearning",
  },

  description:
    "UpLearning Startup Builder Programme helps students, aspiring entrepreneurs, founders, family business successors, and professionals build real startups through practical execution, mentorship, validation, branding, marketing, sales, GTM strategy, MVP development, and startup ecosystem exposure.",

  keywords: [
    "UpLearning",
    "Startup Builder Programme",
    "startup course",
    "entrepreneurship programme",
    "startup training",
    "startup incubation",
    "startup mentorship",
    "founder programme",
    "business building programme",
    "entrepreneurship education",
    "startup ecosystem",
    "startup accelerator",
    "startup bootcamp",
    "startup certification",
    "business validation",
    "idea validation",
    "MVP development",
    "brand building",
    "startup marketing",
    "go to market strategy",
    "GTM strategy",
    "sales training",
    "business development",
    "founder community",
    "student entrepreneurship",
    "college startup programme",
    "startup learning",
    "startup workshop",
    "startup execution",
    "startup roadmap",
    "startup expo",
    "startup network",
    "startup growth",
    "startup launch",
    "startup coaching",
    "family business programme",
    "future founders",
    "young entrepreneurs",
    "startup certification india",
    "entrepreneurship course india",
    "online startup programme",
    "startup programme for students",
    "startup programme for founders",
    "learn entrepreneurship",
    "build a startup",
    "how to start a startup",
    "startup skills",
    "business skills",
    "startup education india",
    "founder training",
    "startup builder india",
  ],

  authors: [
    {
      name: "UpLearning",
    },
  ],

  creator: "UpLearning",
  publisher: "UpLearning",

  category: "Education",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://uplearning.in",
    siteName: "UpLearning",
    title: "UpLearning Startup Builder Programme",
    description:
      "A practical entrepreneurship programme where students and first-time founders build a real brand and startup from scratch.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UpLearning Startup Builder Programme",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UpLearning Startup Builder Programme",
    description:
      "Learn entrepreneurship through execution. Build a startup, validate ideas, create brands, and launch products.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://uplearning.in",
  },

  applicationName: "UpLearning",

  other: {
    "theme-color": "#FF6B00",
    "apple-mobile-web-app-title": "UpLearning",
    "mobile-web-app-capable": "yes",
  },
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}
         <Toaster
          richColors
          position="top-right"
          closeButton
        />
      </body>
    </html>
  );
}
