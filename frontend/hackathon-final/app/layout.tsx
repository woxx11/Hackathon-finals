import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased dark`}
    >
      <head>
        {/*
          Tell the Dark Reader extension to leave this page alone — it's
          already dark-native, and Dark Reader's filter fighting our own
          palette is what washes the UI out to near-invisible for users
          who have it installed.
        */}
        <meta name="darkreader-lock" content="" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-ink-950 text-text-primary">
        {children}
      </body>
    </html>
  );
}
