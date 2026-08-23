import type { Metadata } from "next";
import { Manrope, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AqlZo'r — AI o'quv hamrohi",
  description: "AI bilan o'rgan, do'stlaring bilan bilim bo'yicha bellash.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      suppressHydrationWarning
      className={`${manrope.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-ink-950 text-text-primary">
        {children}
      </body>
    </html>
  );
}
