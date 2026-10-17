'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useRef } from 'react';
import useSWRMutation from 'swr/mutation';
import { sendContact } from '../../../lib/sendContact';
import { useForm } from 'react-hook-form';
import {
  validationSchema,
  type ContactForm,
} from '../../../utils/validationSchema';

export function ContactClient() {
  const {
    trigger,
    data: result,
    error,
    isMutating,
  } = useSWRMutation('/api/contact-form', sendContact, { revalidate: false });
  // Block rapid submissions before React has rendered the disabled button.
  const submissionStarted = useRef(false);

  // React Hook Form(Valibotでバリデーション管理)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    mode: 'onChange',
    resolver: valibotResolver(validationSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    if (submissionStarted.current) return;
    submissionStarted.current = true;
    try {
      await trigger(data);
    } catch {
      // SWR exposes the error below. Only a deliberate retry sends another POST.
      submissionStarted.current = false;
    }
  };

  return (
    <div className="relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 max-sm:p-5 dark:bg-dark dark:border-light max-xl:col-span-4 max-md:order-1 max-md:col-span-8">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl max-xs:-right-2 max-sm:h-[102%] max-xs:w-full max-xs:rounded-[1.5rem]" />
      {result?.status !== 1 ? (
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
              className="shadow-sm appearance-none border rounded-sm bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:border-primary-sky"
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
              className="shadow-sm appearance-none border rounded-sm bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:border-primary-sky"
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
              className="shadow-sm appearance-none border rounded-sm bg-white w-full h-52 py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:border-primary-sky"
            />
            <p className="text-errorRed">
              {errors.message?.message as React.ReactNode}
            </p>
          </div>
          {error && (
            <p role="alert" className="mb-4 text-errorRed">
              送信結果を確認できませんでした。再送すると重複する可能性があります。時間をおいてご確認ください。
            </p>
          )}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isMutating}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline"
            >
              {isMutating ? '送信中...' : '送信する'}
            </button>
          </div>
        </form>
      ) : (
        // 送信後に出力
        <div>
          <p className="w-full block text-center text-gray-700 font-bold mb-2 dark:text-light max-md:text-start max-sm:p-3">
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
