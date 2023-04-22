import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../utils/validationSchema';
import { AnimatedText } from 'components/AnimatedText';
import { Layout } from 'components/Layout';
import { TransitionEffect } from 'components/TransitionEffect';

// フォーム内の型定義
interface Form {
  name: string;
  email: string;
  content: string;
}

// React Hook Form
const contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema), // zodの導入
  });

  // フォーム送信後の機能実装
  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Joji Iba | Contact Page</title>
        <meta name="description" content="お問い合わせ" />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="お問い合わせ"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2 dark:text-light"
              >
                お名前<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="田中 太郎"
                {...register('name')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p>{errors.name?.message as React.ReactNode}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2 dark:text-light"
              >
                メールアドレス<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="sample@gmail.com"
                {...register('email')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p>{errors.email?.message as React.ReactNode}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2 dark:text-light"
              >
                お問い合わせ内容<span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="お問い合わせ内容を入力してください"
                {...register('content')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p>{errors.content?.message as React.ReactNode}</p>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                送信する
              </button>
            </div>
          </form>
        </Layout>
      </main>
    </>
  );
};

export default contact;
