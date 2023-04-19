import Link from 'next/link'
import React from 'react'
import { Layout } from './Layout'

export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg">
      <Layout className="py-8 flex items-center justify-between">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center">
          Build Width
          <span className="text-emerald-500 text-2xl px-1">&#9827;</span>{' '}
          by&nbsp;
          <Link href="/" className="underline underline-offset-2">
            JOJI IBA INC.
          </Link>
        </div>
        <Link
          href="/"
          target={'_blank'}
          className="underline underline-offset-2"
        >
          Say hello
        </Link>
      </Layout>
    </footer>
  )
}
