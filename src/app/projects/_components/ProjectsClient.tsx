'use client';

import { useEffect, useState } from 'react';
import ReduxBoardApp from '../../../../public/images/ReduxBoardApp.jpg';
import ChatGPTClone from '../../../../public/images/chatgptclone.jpg';
import Coming from '../../../../public/images/coming.jpg';
import BestProject from '../../../../public/images/myportfolio.jpg';
import BestProject02 from '../../../../public/images/myportfolioDark.jpg';
import Project1 from '../../../../public/images/project1.jpg';
import Project2 from '../../../../public/images/project2.jpg';
import { FeaturedProject } from './FeaturedProject';
import { Project } from './Project';

export function ProjectsClient() {
  // ダークモードでの画像切替
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState(BestProject);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme') || 'light';
    setImgSrc(theme === 'dark' ? BestProject : BestProject02);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
      <div className="col-span-12">
        <FeaturedProject
          title="Joji.Iba Portfolio Site"
          img={imgSrc}
          summary="React、Next.js、TypeScript、TailwindCSSを用いて作成した私のSPAポートフォリオです。
                ①ダークモード切替機能、②framer-motionによる画面遷移アニメーション、③React-Hook-Formでの問い合わせフォーム、④zod導入によるバリデーション管理、⑤nodemailerとAPI連携によるGメール送信機能、⑥FireBaseでの認証機能などのReact/Next.jsによる機能を数多く実装しています。今後実装予定の機能として、microCMSを用いた動的ルーティングでのページ実装などを予定しております。"
          link="/"
          github="https://github.com/joji-iba/2023_Next.js_Portfolio"
          type="Best Feature Project(個人開発)"
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
      <div className="col-span-12">
        <FeaturedProject
          title="Redux-board-app"
          img={ReduxBoardApp}
          summary="Reduxで状態管理をし、React/TypeScriptを用いて作成した掲示板型アプリです。
                作成理由は、Reduxによる状態管理の方法の習得したかった為です。actionの生成→Storeへdispatch→Reducerでの投稿と削除機能の実装、までの一連の流れを掴む為につくりました。"
          link="https://redux-board-app-nu.vercel.app/"
          github="https://github.com/joji-iba/redux-board-app"
          type="Feature Project(個人開発)"
        />
      </div>
      <div className="col-span-12">
        <FeaturedProject
          title="ChatGPT-Clone"
          img={ChatGPTClone}
          summary="Next.js/TypeScript/TailwindCSSを用いて作成したChatGPTのクローンアプリです。OpenAIのAPIキーを叩いている為、「gpt-3.5-turbo」と実際にやり取りができます。作成した理由は、API連携の知識と技術を定着させたかったことと、その成果物として何か形にしたかったことの2点です。非常にシンプルに作成していますが、Vercelにもデプロイ済ですので、一度お試し下さい。"
          link="https://chat-gpt-clone-blue.vercel.app/"
          github="https://github.com/joji-iba/ChatGPT-Clone"
          type="Feature Project(個人開発)"
        />
      </div>
      <div className="col-span-6 sm:col-span-12">
        <Project
          title="Modern Website"
          img={Project2}
          link="https://joji-iba.github.io/Markup_and_JS_only_Website/"
          github="https://github.com/joji-iba/Markup_and_JS_only_Website"
          type="Website"
        />
      </div>
      <div className="col-span-6 sm:col-span-12">
        <Project
          title="Coming Soon!!"
          img={Coming}
          link="/"
          github="/"
          type="Coming Soon!!"
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
            </div> */}
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
            </div> */}
    </div>
  );
}
