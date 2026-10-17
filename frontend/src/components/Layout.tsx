import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div
      className={`w-full h-hull inline-block z-0 bg-light p-32 dark:bg-dark max-xl:p-24 max-lg:p-16 max-md:p-12 max-sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
};
