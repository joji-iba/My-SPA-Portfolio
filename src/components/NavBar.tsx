import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { auth } from '../firebase';
import { TwitterIcon, GithubIcon, SunIcon, MoonIcon } from './Icons';
import Logo from './Logo';
import { useThemeSwitcher } from './hooks/useThemeSwitcher';

interface CustomLinkProps {
  href: string;
  title: string;
  className?: string;
  toggle: () => void;
}

// ヘッダーリンクのコンポーネント
const CustomLink = ({ href, title, className = '' }: CustomLinkProps) => {
  // 各ページ滞在時のメニューの下線表示キープ（パス情報と各リンクの一致を検知）
  const router = useRouter();

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`
      h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({
  href,
  title,
  className = '',
  toggle,
}: CustomLinkProps) => {
  // 各ページ滞在時のメニューの下線表示キープ（パス情報と各リンクの一致を検知）
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      // href={href}
      className={`${className} relative group text-light dark:text-dark my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`
      h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-dark`}
      >
        &nbsp;
      </span>
    </button>
  );
};

export default function NavBar() {
  const [mode, setMode] = useThemeSwitcher(); // ダークモード切替の為のhook
  const [isOpen, setIsOpen] = useState(false);

  // ハンバーガーメニュー開閉
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8">
      {/* ハンバーガーメニュー */}
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? `rotate-45 translate-y-1` : `-translate-y-0.5`
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? `opacity-0` : `opacity-100`
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${
            isOpen ? `-rotate-45 -translate-y-1` : `translate-y-0.5`
          }`}
        ></span>
      </button>

      <div className="w-full flex justify-between items-center lg:hidden">
        {/* ヘッダーメニュー */}
        <nav className="flex items-center justify-center">
          <CustomLink
            href="/"
            title="Home"
            className="mr-4"
            toggle={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <CustomLink
            href="/about"
            title="About"
            className="mx-4"
            toggle={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <CustomLink
            href="/projects"
            title="Projects"
            className="mx-4"
            toggle={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <CustomLink
            href="/contact"
            title="Contact"
            className="ml-4"
            toggle={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </nav>

        {/* SNSアイコン */}
        <nav className="flex items-center justify-center flex-wrap">
          <motion.a
            href="https://mobile.twitter.com/Joji0921jojo"
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mr-3"
          >
            <TwitterIcon />
          </motion.a>
          <motion.a
            href="https://github.com/joji-iba"
            target={'_blank'}
            className="w-6 ml-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <GithubIcon />
          </motion.a>

          {/* ダークモード切替ボタン */}
          <button
            onClick={() =>
              (setMode as React.Dispatch<React.SetStateAction<string>>)(
                mode === 'light' ? 'dark' : 'light',
              )
            }
            className={`ml-3 flex items-center justify-center rounded-full p-1
            ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
            `}
          >
            {mode === 'dark' ? (
              <SunIcon className={'fill-dark'} />
            ) : (
              <MoonIcon className={'fill-dark'} />
            )}
          </button>

          {/* サインアウトボタン */}
          <button
            onClick={() => auth.signOut()}
            className="ml-3 bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold border-2 border-solid border-transparent capitalize hover:bg-light hover:text-dark hover:bg-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark  hover:dark:text-light hover:dark:border-light sm:!p-2 sm:!px-4 sm:!text-base"
          >
            Sign Out
          </button>
        </nav>
      </div>

      {/* モバイルメニュー */}
      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          {/* ヘッダーメニュー */}
          <nav className="flex items-center flex-col justify-center">
            <CustomMobileLink
              href="/"
              title="Home"
              className=""
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/about"
              title="About"
              className=""
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/projects"
              title="Projects"
              className=""
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/contact"
              title="Contact"
              className=""
              toggle={handleClick}
            />
          </nav>

          {/* SNSアイコン */}
          <nav className="flex items-center justify-center mt-2">
            <motion.a
              href="https://mobile.twitter.com/Joji0921jojo"
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3 sm:mx-1"
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href="https://github.com/joji-iba"
              target={'_blank'}
              className="w-6 m-1 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon />
            </motion.a>

            {/* ダークモード切替ボタン */}
            <button
              onClick={() =>
                (setMode as React.Dispatch<React.SetStateAction<string>>)(
                  mode === 'light' ? 'dark' : 'light',
                )
              }
              className={`ease w-8 m-1 ml-3 sm:!mx-1 flex items-center justify-center rounded-full p-1
            ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
            `}
            >
              {mode === 'dark' ? (
                <SunIcon className={'fill-dark'} />
              ) : (
                <MoonIcon className={'fill-dark'} />
              )}
            </button>

            {/* サインアウトボタン */}
            <button
              onClick={() => auth.signOut()}
              className="ml-3 bg-light text-dark p-2.5 px-6 rounded-lg text-lg font-semibold border-2 border-solid border-transparent capitalize hover:bg-dark hover:text-light hover:bg-transparent hover:border-light dark:bg-dark dark:text-light hover:dark:bg-light  hover:dark:text-dark hover:dark:border-light sm:!p-2 sm:!px-4 sm:!text-base"
            >
              Sign Out
            </button>
          </nav>
        </motion.div>
      ) : null}

      {/* ロゴ */}
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>
    </header>
  );
}
