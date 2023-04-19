import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TwitterIcon, GithubIcon } from './Icons';
import Logo from './Logo';

// ヘッダーリンクのコンポーネント
const CustomLink = ({ href, title, className = '' }) => {
  // 各ページ滞在時のメニューの下線表示キープ（パス情報と各リンクの一致を検知）
  const router = useRouter();

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`
      h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'}`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

export default function NavBar() {
  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between border-b border-gray-200 text-gray-700">
      <div className="container mx-auto flex justify-between flex-row items-center p-5">
        {/* ヘッダーメニュー */}
        <nav className="flex items-center justify-center">
          <CustomLink href="/" title="Home" className="mr-4" />
          <CustomLink href="/about" title="About" className="mx-4" />
          <CustomLink href="/skills" title="Skills" className="mx-4" />
          <CustomLink href="/projects" title="Projects" className="mx-4" />
          <CustomLink href="/contact" title="Contact" className="ml-4" />
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
        </nav>
      </div>

      {/* ロゴ */}
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>
    </header>
  );
}
