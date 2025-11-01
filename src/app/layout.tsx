import { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/common/ThemeProvider";

export const metadata: Metadata = {
  title: "coyaSONG",
  description: "프론트엔드 개발 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white font-sans">
        <ThemeProvider>
          <Header />
          <div className="container mx-auto px-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
