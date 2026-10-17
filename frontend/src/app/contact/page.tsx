import { Metadata } from 'next';
import AnimatedText from '../../components/AnimatedText';
import { Layout } from '../../components/Layout';
import TransitionEffect from '../../components/TransitionEffect';
import { ContactClient } from './_components/ContactClient';

export const metadata: Metadata = {
  title: 'Joji Iba | Contact Page',
  description: 'お問い合わせ',
};

export default function Contact() {
  return (
    <>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Contact"
            className="mb-16 max-lg:text-7xl! max-sm:mb-8 max-sm:text-6xl! max-xs:text-4xl!"
          />
          <ContactClient />
        </Layout>
      </main>
    </>
  );
}
