import { Metadata } from 'next';
import AnimatedText from '../../components/AnimatedText';
import { Layout } from '../../components/Layout';
import TransitionEffect from '../../components/TransitionEffect';
import { ProjectsClient } from './_components/ProjectsClient';

export const metadata: Metadata = {
  title: 'Joji Iba | Projects Page',
  description: '私の開発実績',
};

export default function Projects() {
  return (
    <>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="開発実績"
            className="mb-16 max-lg:text-7xl! max-sm:mb-8 max-sm:text-6xl! max-xs:text-4xl!"
          />
          <ProjectsClient />
        </Layout>
      </main>
    </>
  );
}
