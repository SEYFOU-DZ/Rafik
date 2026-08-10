import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "رفيقك الذكي | منصة الصحة النفسية للجزائريين",
  description: "منصة رفيقك الذكي - الوجهة الأولى في الجزائر للحصول على خدمات الصحة النفسية. احجز موعدك مع أخصائيين نفسيين معتمدين واستفد من أدواتنا العلاجية الحصرية.",
  keywords: "صحة نفسية, جزائر, أخصائي نفسي, حجز مواعيد, علاج نفسي, قلق, اكتئاب",
  authors: [{ name: "رفيقك الذكي" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "رفيقك الذكي | منصة الصحة النفسية",
    description: "طريقك نحو الصحة النفسية مع أفضل الأخصائيين في الجزائر",
    type: "website",
    locale: "ar_DZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

import Providers from "./providers";
