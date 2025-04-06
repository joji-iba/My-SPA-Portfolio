import { Montserrat } from 'next/font/google';
import '../styles/globals.css';
import '../styles/tailwind-util.css';
import Script from 'next/script';
import AuthProvider from '@/components/AuthProvider';
import SWRProvider from '@/components/SWRProvider';

// ページ全体のフォント読込
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
});

export const metadata = {
  title: 'Joji.Iba Portfolio',
  description: 'ポートフォリオサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={montserrat.variable} suppressHydrationWarning>
      <body>
        {/* 初期レンダリング時の表示崩れ防止 */}
        <script></script>
        {/* ダークモードのリロード時も状態保持するscript */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          `}
        </Script>
        <SWRProvider>
          <AuthProvider>{children}</AuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
