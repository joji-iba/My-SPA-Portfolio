'use client';
import { signInWithPopup } from 'firebase/auth';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Footer } from '../components/Footer';
import NavBar from '../components/NavBar';
import { auth, provider } from '../firebase';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // FOUC回避の記述
  const [showScreen, setShowScreen] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setShowScreen(true);
  }, []);

  if (!showScreen) return null;

  if (!user) {
    return <SignInButton />;
  }

  return (
    <main className="font-mont bg-light dark:bg-dark min-h-screen">
      <NavBar />
      <AnimatePresence mode="wait">{children}</AnimatePresence>
      <Footer />
    </main>
  );
}

// SignInButtonコンポーネント
function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
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
  );
}
