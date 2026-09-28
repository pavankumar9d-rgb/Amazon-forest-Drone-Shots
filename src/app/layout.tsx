import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMAZONIA — An 80-Second Cinematic Flight Through The Primeval Forest",
  description:
    "An interactive nature documentary where scrolling controls an 80-second continuous flight through the Amazon rainforest. From sunrise over the endless canopy to the bioluminescent night.",
  keywords: [
    "Amazon Rainforest",
    "Cinematic Flight",
    "Interactive Documentary",
    "Aerial Expedition",
    "Canopy",
    "Amazon River",
  ],
  authors: [{ name: "National Geographic Creative Direction" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0F0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="bg-[#0A0F0A] text-[#F7F4EC] selection:bg-[#4FD1B8]/30 selection:text-[#F7F4EC]">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
