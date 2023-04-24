import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
