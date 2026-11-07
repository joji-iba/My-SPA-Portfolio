'use client';

import { AnimatePresence } from 'framer-motion';
import { Footer } from './Footer';
import NavBar from './NavBar';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mont bg-light dark:bg-dark min-h-screen">
      <NavBar />
      <AnimatePresence mode="wait">{children}</AnimatePresence>
      <Footer />
    </div>
  );
}
