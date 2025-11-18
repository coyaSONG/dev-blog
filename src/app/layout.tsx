import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";

const pretendard = localFont({
  src: "../../fonts/Pretendard/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const gmarketSans = localFont({
  src: [
    {
      path: "../../fonts/GmarketSans/GmarketSansLight.woff2",
      weight: "300",
    },
    {
      path: "../../fonts/GmarketSans/GmarketSansMedium.woff2",
      weight: "500",
    },
    {
      path: "../../fonts/GmarketSans/GmarketSansBold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-gmarket-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "coyaSONG",
    template: "%s | coyaSONG"
  },
  description: "프론트엔드 개발 블로그",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: 'coyaSONG',
    description: '프론트엔드 개발 블로그',
    siteName: 'coyaSONG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'coyaSONG',
    description: '프론트엔드 개발 블로그',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="ko" suppressHydrationWarning>
        <body className={`${pretendard.variable} ${gmarketSans.variable} bg-white text-black dark:bg-gray-900 dark:text-white`}>
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
