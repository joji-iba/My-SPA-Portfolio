import { Metadata } from 'next';
import AnimatedText from '../../components/AnimatedText';
import { Layout } from '../../components/Layout';
import TransitionEffect from '../../components/TransitionEffect';
import { AboutClient } from './_components/AboutClient';
import { Skills } from './_components/Skills';

export const metadata: Metadata = {
  title: 'Joji Iba | About Page',
  description: '私について',
};

export default function About() {
  return (
    <>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="I'll continue to challenge technological innovation."
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <AboutClient />
          <Skills />
        </Layout>
      </main>
    </>
  );
}
