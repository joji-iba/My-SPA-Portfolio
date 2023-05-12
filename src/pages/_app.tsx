import '../styles/globals.css';
import '../styles/tailwind-util.css';
import { signInWithPopup } from 'firebase/auth';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase';
import { Footer } from 'components/Footer';
import NavBar from 'components/NavBar';

// ページ全体のフォント読込
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
});

// Googleサインイン
const SignInButton = () => {
  const signInWithGoogle = () => {
    // Googleでサインイン
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-md shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Sign in
          </h2>
          <div>
            <button
              className="w-full p-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50"
              type="submit"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// サインアウト
const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>サインアウト</button>;
};

// ユーザー情報
const UserInfo = () => {
  const currentUser = auth.currentUser;

  return (
    <>
      <div className="userInfo">
        {currentUser && (
          <div>
            <img src={auth.currentUser?.photoURL || ''} alt="" />
            <p>{auth.currentUser?.displayName || ''}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // FOUC回避の記述
  const [show_screen, setShowScreen] = useState(false);

  useEffect(() => {
    setShowScreen(true);
  }, []);

  // ユーザーアカウントの認識
  const [user] = useAuthState(auth);

  return (
    <>
      {show_screen ? (
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
          </Head>
          {user ? (
            // サインイン後に表示
            <main
              className={`${montserrat.variable} font-mont bg-light dark:bg-dark min-h-screen`}
            >
              <NavBar />
              <AnimatePresence mode="wait">
                <Component key={router.asPath} {...pageProps} />
              </AnimatePresence>
              <Footer />
            </main>
          ) : (
            // サインイン前に表示
            <SignInButton />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
