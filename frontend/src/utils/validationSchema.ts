// Contact Formのバリデーション管理
import { z } from 'zod';

export const validationSchema = z.object({
  name: z
    .string()
    .nonempty('※お名前は必須です。')
    .min(2, 'お名前は2文字以上で入力して下さい。'),
  email: z
    .string()
    .nonempty('※メールアドレスは必須です。')
    .email('正しいメールアドレスを入力して下さい。'),
  message: z.string().nonempty('※お問い合わせ内容は必須です。'),
});
