import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const noto = Noto_Serif({
  variable: "--font-noto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wende Portfolio",
  description: "Wende's personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${noto.variable} flex min-h-screen flex-col pt-14 antialiased`}
      >
        <SmoothScroll>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
