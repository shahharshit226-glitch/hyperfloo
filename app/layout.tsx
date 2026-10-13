import "./globals.css";
import { Inter_Tight } from "next/font/google";
import { AGENCY_NAME } from "@/config";
const f = Inter_Tight({ subsets: ["latin"], variable: "--f" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${AGENCY_NAME} | Website, App and Automation Studio`,
    template: `%s | ${AGENCY_NAME}`,
  },
  description: "Hyperfloo is a Nepal-based digital studio building high-performance websites, web and mobile apps, business automation systems, logo and brand identities, and practical digital solutions.",
  keywords: [
    "website development",
    "custom website development",
    "web design",
    "responsive web design",
    "UI UX design",
    "app development",
    "web application development",
    "mobile app development",
    "business automation",
    "workflow automation",
    "business process automation",
    "AI solutions",
    "logo design",
    "brand identity",
    "branding design",
    "digital product development",
    "custom software",
    "web development Nepal",
    "digital agency Nepal",
    "web design Biratnagar",
  ],
  authors: [{ name: AGENCY_NAME }],
  creator: AGENCY_NAME,
  publisher: AGENCY_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: AGENCY_NAME,
    title: `${AGENCY_NAME} | Website, App and Automation Studio`,
    description: "Websites, web and mobile apps, business automation, web design and brand identity from a Nepal-based digital studio.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${AGENCY_NAME} | Website, App and Automation Studio`,
    description: "Websites, web and mobile apps, business automation, web design and brand identity from a Nepal-based digital studio.",
  },
};
export default function L({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: AGENCY_NAME,
    url: siteUrl,
    description: "Nepal-based website, web app, mobile app, automation, web design and brand identity studio for growing businesses.",
    email: "hyperfloo.online@gmail.com",
    areaServed: ["Nepal", "Worldwide"],
    serviceType: ["Custom website development", "Web application development", "Mobile app development", "Business process automation", "Responsive web design", "Logo design", "Brand identity", "AI solutions"],
    sameAs: ["https://github.com/shahharshit226-glitch", "https://www.linkedin.com/in/harshitshah506"],
  };
  return <html lang="en" className={f.variable}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
