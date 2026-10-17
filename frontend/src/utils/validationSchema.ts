// Contact Formのバリデーション管理
import * as v from 'valibot';

// Preserve the existing Zod 3 email policy, including apostrophes in the local
// part. Valibot's email() accepts a different set of addresses.
const contactEmailPattern =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

export const validationSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty('※お名前は必須です。'),
    v.minLength(2, 'お名前は2文字以上で入力して下さい。'),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty('※メールアドレスは必須です。'),
    v.regex(contactEmailPattern, '正しいメールアドレスを入力して下さい。'),
  ),
  message: v.pipe(v.string(), v.nonEmpty('※お問い合わせ内容は必須です。')),
});

export type ContactForm = v.InferOutput<typeof validationSchema>;
