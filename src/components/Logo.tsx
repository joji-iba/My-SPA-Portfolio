// アニメーションの実装
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const MotionLink = motion(Link)

function Logo() {
  return (
    <div className="flex items-center justify-center mt-2">
      <MotionLink
        href="/"
        className="w-16 h-16 bg-dark text-light flex items-center justify-center rounded-full text-2xl font-bold  border border-solid border-transparent dark:border-light"
        whileHover={{
          backgroundColor: [
            'rgba(69, 69, 82, 1)',
            'rgba(232, 90, 112, 1)',
            'rgba(78, 161, 213, 1)',
            'rgba(234, 234, 234, 1)',
            'rgba(69, 69, 82, 1)',
          ],
          transition: {
            duration: 1,
            repeat: Infinity,
          },
        }}
      >
        J.I
      </MotionLink>
    </div>
  )
}

export default Logo
