'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import IconImage from '../../public/images/patternC01.png';
import IconImageDark from '../../public/images/patternC02.png';

export default function ThemeImage() {
  // ダークモードでの画像切替
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState(IconImage);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme') || 'light';
    setImgSrc(theme === 'dark' ? IconImageDark : IconImage);
  }, []);

  if (!mounted) {
    return (
      <Image
        src={IconImage}
        alt="Joji.Iba"
        className="w-full h-auto lg:hidden md:inline-block md:w-full"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt="Joji.Iba"
      className="w-full h-auto lg:hidden md:inline-block md:w-full"
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
    />
  );
}
