'use client';

import { motion } from 'framer-motion';

// 画面遷移のアニメーション
export default function TransitionEffect() {
  return (
    <>
      {/* left block */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-coolRed"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        exit={{ x: ['0%', '100%'], width: ['0%', '100%'] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      {/* center block */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-coolAqua"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
      />
      {/* right block */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-coolGray"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
      />
    </>
  );
}
