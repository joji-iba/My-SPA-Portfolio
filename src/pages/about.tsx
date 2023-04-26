import {
  useInView,
  useMotionValue,
  useSpring,
  // MotionValue,
  // TargetAndTransition,
} from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { FC, useEffect, useRef } from 'react';
import ProfilePic from '../../public/images/patternB.png';
import { AnimatedText } from 'components/AnimatedText';
import { Layout } from 'components/Layout';
import Skills from 'components/Skills';
import { TransitionEffect } from 'components/TransitionEffect';

// 型定義
type AnimatedNumbersProps = {
  value: number;
};

// valueで渡した数値までのカウントアップ実装
const AnimatedNumbers: FC<AnimatedNumbersProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 }); // アニメーションの制御
  const isInview = useInView(ref, {
    once: true,
  }) as boolean;

  useEffect(() => {
    if (isInview && motionValue.get() !== value) {
      motionValue.set(value);
    }
  }, [isInview, value, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const about = () => {
  return (
    <>
      <Head>
        <title>Joji Iba | About Page</title>
        <meta name="description" content="私について" />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="I'll continue to challenge technological innovation."
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-3 flex flex-col items-center justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                私について
              </h2>
              <p className="font-medium">
                - 【経歴：小学校教員→住宅設計職→Webエンジニア】
                <br />
                2020年にプログラミングと出会い、独学でWeb制作分野を学び、コーダーとしてWebマーケティング会社に転職を果たし、2年間コーディングとマーケティング業務に携わりました。
                現在は、Web開発分野のスキルアップに励みつつ、フリーとしても活動しています！
              </p>
              <p className="my-4 font-medium">
                -
                前職のマーケティング会社では、Web上での「表示速度」に拘り抜いてコーディングしていました。
                CVRにも直結する要素である為、ユーザーにとって、スムーズな「画面遷移」や「レンダリング」は非常に重要な要素だと考えています。
                ReactやNext.jsを学び始めたことがきっかけで、『UI/UXを意識したエンジニアとしてスキルを磨き、利便性とパフォーマンスの高いSPA開発をしたい』と考えるようになりました。
              </p>

              <p className="font-medium">
                -
                エンジニアとしての「自走力」と「知的好奇心旺盛さ」をフルに発揮し、ユーザー中心的な考え方をもって実務に取り組みます！
                私のスキルと情熱を発揮する機会を楽しみにしています！！
              </p>
            </div>

            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={ProfilePic}
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
                  <AnimatedNumbers value={29} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  age
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={2} />+
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
          <Skills />
        </Layout>
      </main>
    </>
  );
};

export default about;
