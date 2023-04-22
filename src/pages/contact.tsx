import Head from 'next/head';
import { AnimatedText } from 'components/AnimatedText';
import { Layout } from 'components/Layout';
import { TransitionEffect } from 'components/TransitionEffect';

const contact = () => {
  return (
    <>
      <Head>
        <title>Joji Iba | Contact Page</title>
        <meta name="description" content="お問い合わせ" />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="お問い合わせ" className="mb-16" />
        </Layout>
      </main>
    </>
  );
};

export default contact;
