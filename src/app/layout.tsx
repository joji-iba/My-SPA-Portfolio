import { Montserrat } from 'next/font/google';
import '../styles/globals.css';
import '../styles/tailwind-util.css';
import AuthProvider from 'components/AuthProvider';

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
    <html lang="ja" className={montserrat.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
