import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Project1 from '../../public/images/project1.jpg';
import Project2 from '../../public/images/project2.jpg';
import Project3 from '../../public/images/project3.jpg';
import { AnimatedText } from 'components/AnimatedText';
import { GithubIcon } from 'components/Icons';
import { Layout } from 'components/Layout';

const FramerImage = motion(Image);

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl" />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <div className="w-1/2 flex flex-col items-start justify-between pl-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light">{summary}</p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            {' '}
            <GithubIcon />{' '}
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark"
          >
            Vist Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, github }) => {
  return (
    <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light" />
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
        <span className="text-primary font-medium text-xl dark:text-primaryDark">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold">{title}</h2>
        </Link>
        <div className="w-full mt-2 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            className="text-lg font-semibold underline"
          >
            Visit
          </Link>
          <Link href={github} target="_blank" className="w-8">
            <GithubIcon />{' '}
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
        <meta name="description" content="any description" />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Trumps Knowledge!"
            className="mb-16"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32">
            <div className="col-span-12">
              <FeaturedProject
                title="JoyRoom.2/ジョイルーム"
                img={Project1}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="https://joyroom2.com/"
                github="https://github.com/joji-iba/Joy_Room2"
                type="Feature Project"
              />
            </div>
            <div className="col-span-6">
              <Project
                title="Wrink Fade/リンクフェード"
                img={Project3}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="https://joji-iba.github.io/wrink_fade/"
                github="https://github.com/joji-iba/wrink_fade"
                type="Landing Page"
              />
            </div>
            <div className="col-span-6">
              <Project
                title="Crypto Screener Application"
                img={Project1}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="/"
                github="/"
                type="Website"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Modern Website"
                img={Project2}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts.
                        It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your
                        local currency."
                link="https://joji-iba.github.io/Markup_and_JS_only_Website/"
                github="https://github.com/joji-iba/Markup_and_JS_only_Website"
                type="Feature Project(個人開発)"
              />
            </div>
            <div className="col-span-6">
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
            <div className="col-span-6">
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
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
