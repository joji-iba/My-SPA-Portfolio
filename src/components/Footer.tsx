import Link from 'next/link';
import React from 'react';
import { Layout } from './Layout';

export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center lg:py-2">
          Build Width
          <span className="text-emerald-500 dark:text-primaryDark text-2xl px-1">&#9827;</span>{' '}
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
  );
};
