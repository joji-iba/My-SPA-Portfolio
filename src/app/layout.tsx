import { Montserrat } from 'next/font/google';
import { Footer } from 'components/Footer';
import NavBar from 'components/NavBar';
import '../styles/globals.css';

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
    <html lang="ja">
      <body
        className={`${montserrat.variable} font-mont bg-light dark:bg-dark`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
