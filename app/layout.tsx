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
  description: "Hyperfloo builds high-performance websites, mobile and web apps, automation systems, brand identities and practical digital solutions for growing businesses.",
  keywords: [
    "website development",
    "web design",
    "app development",
    "business automation",
    "AI solutions",
    "logo design",
    "brand identity",
    "digital product development",
    "custom software",
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
    description: "Websites, apps, automation, web design and brand identity for businesses ready to move forward.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${AGENCY_NAME} | Website, App and Automation Studio`,
    description: "Websites, apps, automation, web design and brand identity for businesses ready to move forward.",
  },
};
export default function L({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: AGENCY_NAME,
    url: siteUrl,
    description: "Website, app, automation, web design and brand identity studio for growing businesses.",
    email: "shahharshit226@gmail.com",
    areaServed: "Worldwide",
    serviceType: ["Website development", "App development", "Business automation", "Web design", "Logo design", "Brand identity", "AI solutions"],
    sameAs: ["https://github.com/shahharshit226-glitch", "https://www.linkedin.com/in/harshitshah506"],
  };
  return <html lang="en" className={f.variable}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
