import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Project1 from '../../public/images/project1.jpg';
import Project2 from '../../public/images/project2.jpg';
import Project3 from '../../public/images/project3.jpg';
import { AnimatedText } from 'components/AnimatedText';
import { GithubIcon } from 'components/Icons';
import { Layout } from 'components/Layout';
import { TransitionEffect } from 'components/TransitionEffect';

const FramerImage = motion(Image);

// 型定義
interface FeaturedProjectProps {
  type: string;
  title: string;
  summary: string;
  img: string;
  link: string;
  github: string;
}

interface ProjectProps {
  title: string;
  type: string;
  img: string;
  link: string;
  github: string;
}

// メインプロジェクト
const FeaturedProject: FC<FeaturedProjectProps> = ({
  type,
  title,
  summary,
  img,
  link,
  github,
}) => {
  return (
    <article className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-br-3xl xs:p-4">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
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
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark sx:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
          >
            Vist Project
          </Link>
        </div>
      </div>
    </article>
  );
};

// サブプロジェクト
const Project: FC<ProjectProps> = ({ title, type, img, link, github }) => {
  return (
    <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]" />
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-4">
        <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
            {title}
          </h2>
        </Link>
        <div className="w-full mt-2 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            className="text-lg font-semibold underline md:text-base"
          >
            Visit
          </Link>
          <Link href={github} target="_blank" className="w-8 md:w-6">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

const projects = () => {
  return (
    <>
      <Head>
        <title>Joji Iba | Projects Page</title>
        <meta name="description" content="私の実績" />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="制作実績"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">

            <div className="col-span-12">
              <FeaturedProject
                title="Joji.Iba Portfolio Site"
                img={Project2}
                summary="React、Next.js、TypeScript、TailwindCSSを用いて作成した私のポートフォリオサイトです。
                ①ダークモード切替機能、②framer-motionによる画面遷移アニメーション、③React-Hook-Formでの問い合わせフォーム、④zod導入によるバリデーション管理、⑤nodemailerとAPI連携によるGメール送信機能、などのReact/Next.jsによる機能を数多く実装しています。今後実装予定の機能として、✅FireBaseでの認証機能、✅microCMSを用いた動的ルーティングでのページ実装の2点を予定しております。"
                link="/"
                github="https://github.com/joji-iba/2023_Next.js_Portfolio"
                type="Best Feature Project(個人開発)"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Modern Website"
                img={Project2}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="https://joji-iba.github.io/Markup_and_JS_only_Website/"
                github="https://github.com/joji-iba/Markup_and_JS_only_Website"
                type="Website（個人開発）"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Wrink Fade"
                img={Project3}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="https://joji-iba.github.io/wrink_fade/"
                github="https://github.com/joji-iba/wrink_fade"
                type="Landing Page"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="JoyRoom.2/ジョイルーム"
                img={Project1}
                summary="福岡県福岡市早良区西新の斧投げバー：JoyRoom.2のWebサイトです。
                使用言語はHTML/CSS/Sass/JavaScript/PHP/WordPressです。
                FV部分のアニメーションはパフォーマンス向上の為にjQueryを一切使わず、全てCSSで実装しています。またページ途中のイラストの動きは、GSAPを用いて、画面内のスクロールと同期させています。私のフリーランスとしての初HP制作案件となります。"
                link="https://joyroom2.com/"
                github="https://github.com/joji-iba/Joy_Room2"
                type="Feature Project"
              />
            </div>
            {/* <div className="col-span-6 sm:col-span-12">
              <Project
                title="Crypto Screener Application"
                img={Project1}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="/"
                github="/"
                type="Feature Project"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Crypto Screener Application"
                img={Project1}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="/"
                github="/"
                type="Feature Project"
              />
            </div> */}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
