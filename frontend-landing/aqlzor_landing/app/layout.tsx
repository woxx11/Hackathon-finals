import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aqurin — AI yordamchi maktab o'quvchilari uchun",
  description:
    "Aqurin — bu shunchaki AI chatbot emas. Do'stlaring bilan bilim dueliga chiq, AI bilan o'rgan, va o'zingni sinfda birinchi o'ringa chiqar!",
  keywords: ["AI", "education", "school", "quiz", "duel", "uzbekistan", "aqurin"],
  authors: [{ name: "Aqurin Team" }],
  openGraph: {
    title: "Aqurin — Bilim. Bellashuv. G'alaba.",
    description: "Maktab o'quvchilari uchun AI-yordamchi va bilim duel platformasi.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
