import { Metadata } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import { siteConfig } from "@/config/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

const bodyFont = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-body",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "coyaSONG",
    template: "%s | coyaSONG"
  },
  description: "프론트엔드 개발 블로그",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    title: 'coyaSONG',
    description: '프론트엔드 개발 블로그',
    siteName: 'coyaSONG',
    images: [`${siteUrl}/og?title=coyaSONG&description=${encodeURIComponent('프론트엔드 개발 블로그')}`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'coyaSONG',
    description: '프론트엔드 개발 블로그',
    images: [`${siteUrl}/og?title=coyaSONG&description=${encodeURIComponent('프론트엔드 개발 블로그')}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="ko" suppressHydrationWarning className={`${bodyFont.variable} ${headingFont.variable}`}>
        <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
          <ThemeProvider>
            <Header />
            <div className="container mx-auto px-4">
              {children}
            </div>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
