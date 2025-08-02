'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProfilePic from '../../../../public/images/patternB.png';
import ProfilePicDark from '../../../../public/images/patternB01.png';
import { AnimatedNumbers } from './AnimatedNumbers';

export function AboutClient() {
  // ダークモードでの画像切替
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState(ProfilePic);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme') || 'light';
    setImgSrc(theme === 'dark' ? ProfilePicDark : ProfilePic);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
      <div className="col-span-3 flex flex-col items-center justify-start xl:col-span-4 md:order-2 md:col-span-8">
        <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
          私について
        </h2>
        <p className="font-medium">
          -【経歴:教員→住宅設計→Webエンジニア】
          <br />
          2020年から独学でプログラミングを学び、Webマーケティング会社や受託開発、自社開発企業のWebエンジニアとして、5年ほど開発業務に携わっています。現職はバックエンド（DB設計/API開発、認証/決済機能...etc）及びフロントエンドまで一貫したSPA開発を担当しています。
        </p>
        <p className="my-4 font-medium">
          -
          「クエリ速度」や「表示速度」などのパフォーマンスを意識したコーディングを得意としています。
          アプリのユーザーにとっても、スムーズな「画面遷移」や「レンダリング」は非常に重要な要素だと考えています。
          React/Next.js、Go/Ginを学び始めたことがきっかけで、『疎結合でクリーンアーキテクチャな構成且つ高パフォーマンスなSPA開発をしたい』と考えるようになりました。
        </p>
        <p className="my-4 font-medium">
          -
          現職の自社開発企業ではReact/Next.js、TypeScriptやPHP/Laravel、PostgreSQL、Docker、AWSなどの技術を用いた開発に従事しております。また、Lighthouse分析でのCore&nbsp;Web&nbsp;Vitalsの数値改善（フロントエンドチューニング）も得意としています。
        </p>
        <p className="my-4 font-medium">
          -
          多くの技術に触れた上で、いつからか「仕様通りのものをただ作るのではなく、ユーザーファーストの思考で開発を進め、リリース後も実際に使ったユーザーの反応を見ながら改善点などを検証し、より価値のあるものを提供できるようになりたい」と考えるようになりました。自分のスキルを、ものづくりを超えて社会課題の解決へと昇華したいと考えています。
        </p>
        <p className="font-medium">
          -
          エンジニアとしての「自走力」と「知的好奇心旺盛さ」をフルに発揮し、プロダクト志向で実務に取り組みます！
          私のスキルと情熱を発揮する機会を楽しみにしています！！
        </p>
      </div>

      <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8">
        <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
        <Image
          src={imgSrc}
          alt="Joji Iba"
          className="w-full h-auto rounded-2xl"
          priority
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>

      <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
        <div className="flex flex-col items-end justify-center xl:items-center">
          <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
            <AnimatedNumbers value={new Date().getFullYear() - 1993} />+
          </span>
          <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
            age
          </h2>
        </div>
        <div className="flex flex-col items-end justify-center xl:items-center">
          <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
            <AnimatedNumbers value={5} />+
          </span>
          <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
            years of experience
          </h2>
        </div>
        <div className="flex flex-col items-end justify-center xl:items-center">
          <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
            <AnimatedNumbers value={100} />+
          </span>
          <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
            willingness
          </h2>
        </div>
      </div>
    </div>
  );
}
