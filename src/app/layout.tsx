import type { Metadata } from "next";
import { Oswald, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GYM KO TO FITNESS GYM | Reach Your Peak",
  description: "GYM KO TO FITNESS GYM - Modern fitness center for your local community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${oswald.variable} antialiased bg-[#050506] text-zinc-100`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
