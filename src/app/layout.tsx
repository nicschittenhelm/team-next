import type { Metadata } from "next";
import { Lexend, Inter, Share_Tech_Mono } from "next/font/google";
import "../app/globals.css";
import CustomCursor from "../app/components/CustomCursor";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Team NEXT",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${lexend.variable}
          ${inter.variable}
          ${shareTechMono.variable}
          antialiased
        `}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
