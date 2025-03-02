'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../../utils/validationSchema';

// フォーム内の型定義
interface Form {
  name: string;
  email: string;
  message: string;
}

export function ContactClient() {
  // 送信中/後の状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // React Hook Form(zodでバリデーション管理)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema), // zodの導入
  });

  // フォーム送信後、API叩く
  const onSubmit = async (data: Form) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.status === 1) {
        setIsSubmitted(true);
      } else {
        console.log('Failed to submit form');
      }
    } catch (error) {
      alert('An error occurred. See log for details.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 sm:p-5 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
      {!isSubmitted ? (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
              // name="name"
              placeholder="田中 太郎"
              {...register('name')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:border-primary-sky"
            />
            <p className="text-errorRed">
              {errors.name?.message as React.ReactNode}
            </p>
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
              // name="email"
              placeholder="sample@gmail.com"
              {...register('email')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:border-primary-sky"
            />
            <p className="text-errorRed">
              {errors.email?.message as React.ReactNode}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2 dark:text-light"
            >
              お問い合わせ内容<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              // name="message"
              placeholder="お問い合わせ内容を入力してください。"
              {...register('message')}
              className="shadow appearance-none border rounded w-full h-52 py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:border-primary-sky"
            />
            <p className="text-errorRed">
              {errors.message?.message as React.ReactNode}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </div>
        </form>
      ) : (
        // 送信後に出力
        <div>
          <p className="w-full block text-center text-gray-700 font-bold mb-2 dark:text-light md:text-start sm:p-3">
            この度は、お問い合わせ頂き、誠にありがとうございました。
            <br />
            お送り頂いた内容を確認の上、担当者より折り返しご連絡致します。
            <br />
            <br />
            また、ご記入頂いたメールアドレスへ、自動返信の確認メールを送付しています。
            <br />
            自動返信メールが届かない場合、入力頂いたメールアドレスに誤りがあった可能性がございます。
            <br />
            メールアドレスをご確認の上、もう一度フォームよりお問合せください。
          </p>
        </div>
      )}
    </div>
  );
}
