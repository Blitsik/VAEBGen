import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'WARP Generator — генератор конфигураций Cloudflare WARP',
  description: 'Генератор конфигураций Cloudflare WARP: WireGuard и AmneziaWG за пару кликов.',
  keywords: 'WARP, Cloudflare, конфигуратор, генератор, VPN, WireGuard, AmneziaWG',
  openGraph: {
    title: 'WARP Generator',
    description: 'Генератор конфигураций Cloudflare WARP',
    type: 'website',
    locale: 'ru_RU',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/cloud.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800;900&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Manrope', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
