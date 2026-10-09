import "./globals.css";
import { Inter_Tight } from "next/font/google";
import { AGENCY_NAME } from "@/config";
const f = Inter_Tight({ subsets: ["latin"], variable: "--f" });
export const metadata = { title: `${AGENCY_NAME} — Creative Technology Studio`, description: "Websites, brands, intelligent systems and automations for businesses ready to move forward." };
export default function L({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={f.variable}><body>{children}</body></html>;
}
