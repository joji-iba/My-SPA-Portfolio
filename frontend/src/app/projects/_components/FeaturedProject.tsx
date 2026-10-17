'use client';

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { GithubIcon } from '../../../components/Icons';

const FramerImage = motion(Image);

// 型定義
interface FeaturedProjectProps {
  type: string;
  title: string;
  summary: string;
  img: string | StaticImageData;
  link: string;
  github: string;
}

// メインプロジェクト
export function FeaturedProject({
  type,
  title,
  summary,
  img,
  link,
  github,
}: FeaturedProjectProps) {
  return (
    <article className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light max-lg:flex-col max-lg:p-8 max-xs:rounded-2xl max-xs:rounded-br-3xl max-xs:p-4">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl max-xs:-right-2 max-sm:h-[102%] max-xs:w-full max-xs:rounded-[1.5rem]" />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg max-lg:w-full"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw"
        />
      </Link>
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 max-lg:w-full max-lg:pl-0 max-lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark sx:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light max-sm:text-sm">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light max-sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark max-sm:px-4 max-sm:text-base"
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
}
