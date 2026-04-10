import type { Metadata, Viewport } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Evercool Thailand | IAQ & HVAC Specialists",
    template: "%s | Evercool Thailand",
  },
  description:
    "Thailand's trusted indoor air quality and HVAC specialists. AC installation, repair, maintenance, air purifiers, and custom solutions for homes, offices, and factories.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" }],
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Evercool",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Evercool Thailand",
    title: "Evercool Thailand | IAQ & HVAC Specialists",
    description:
      "Thailand's trusted indoor air quality and HVAC specialists. AC installation, repair, maintenance, and custom solutions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#00b2d4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sarabun.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ec_theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme:dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-ec-bg text-ec-text">
        {children}
      </body>
    </html>
  );
}
