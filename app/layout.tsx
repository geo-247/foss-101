import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FOSS GECT ",
  description:
    "A guided visual journey into free and open source software, and the student community at Government Engineering College Thrissur that learns, builds and contributes to it.",
  icons: {
    icon: "/foss-logo.png",
    apple: "/foss-logo.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f4ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
