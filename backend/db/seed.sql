INSERT INTO projects (
    title,
    description,
    type,
    image,
    link,
    github,
    featured,
    created_at,
    updated_at
) VALUES
(
    'Joji.Iba Portfolio Site',
    'React/Next.js(App Router)、TypeScript、TailwindCSS、Firebaseを用いて作成した私のSPAポートフォリオです。①ダークモード切替機能、②framer-motionによる画面遷移アニメーション、③React-Hook-Formでの問い合わせフォーム、④zod導入によるバリデーション管理、⑤nodemailerとAPI連携によるGメール送信機能、⑥FireBaseでの認証機能などのReact/Next.jsによる機能を数多く実装しています。現在Docker環境整備中及びデプロイ先をVercelからAWSへ移行中です。',
    'Best Feature Project(個人開発)',
    '/images/myportfolio.jpg',
    '/',
    'https://github.com/joji-iba/2023_Next.js_Portfolio',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'JoyRoom.2/ジョイルーム',
    '福岡県福岡市早良区西新の斧投げバー：JoyRoom.2のWebサイトです。使用言語はHTML/CSS/Sass/JavaScript/PHP/WordPressです。FV部分のアニメーションはパフォーマンス向上の為にjQueryを一切使わず、全てCSSで実装しています。またページ途中のイラストの動きは、GSAPを用いて、画面内のスクロールと同期させています。私のフリーランスとしての初HP制作案件となります。',
    'Feature Project',
    '/images/project1.jpg',
    'https://joyroom2.com/',
    'https://github.com/joji-iba/Joy_Room2',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Redux-board-app',
    'Reduxで状態管理をし、React/TypeScriptを用いて作成した掲示板型アプリです。作成理由は、Reduxによる状態管理の方法の習得したかった為です。actionの生成→Storeへdispatch→Reducerでの投稿と削除機能の実装、までの一連の流れを掴む為につくりました。',
    'Feature Project(個人開発)',
    '/images/ReduxBoardApp.jpg',
    'https://redux-board-app-nu.vercel.app/',
    'https://github.com/joji-iba/redux-board-app',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'ChatGPT-Clone',
    'Next.js/TypeScript/TailwindCSSを用いて作成したChatGPTのクローンアプリです。OpenAIのAPIキーを叩いている為、「gpt-3.5-turbo」と実際にやり取りができます。作成した理由は、API連携の知識と技術を定着させたかったことと、その成果物として何か形にしたかったことの2点です。非常にシンプルに作成していますが、Vercelにもデプロイ済ですので、一度お試し下さい。',
    'Feature Project(個人開発)',
    '/images/chatgptclone.jpg',
    'https://chat-gpt-clone-blue.vercel.app/',
    'https://github.com/joji-iba/ChatGPT-Clone',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Modern Website',
    'Modern Website Description',
    'Website',
    '/images/project2.jpg',
    'https://joji-iba.github.io/Markup_and_JS_only_Website/',
    'https://github.com/joji-iba/Markup_and_JS_only_Website',
    false,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
