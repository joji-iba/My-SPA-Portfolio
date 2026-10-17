import { describe, expect, it } from 'vitest';
import * as v from 'valibot';
import { validationSchema } from './validationSchema';

const valid = {
  name: '田中',
  email: 'test@example.com',
  message: 'お問い合わせです。',
};

describe('contact validation contract', () => {
  it.each([
    'test@example.com',
    'User+tag@sub.example.co.jp',
    "o'connor@example.com",
    'a_b@example.com',
    'a@foo--bar.com',
    'a@foo-.com',
  ])('retains previously accepted email %s', (email) => {
    expect(v.safeParse(validationSchema, { ...valid, email }).success).toBe(
      true,
    );
  });

  it.each([
    '',
    'plain-address',
    'a@localhost',
    'a@b.c',
    '.a@example.com',
    'a.@example.com',
    'a..b@example.com',
    "a'@example.com",
    'a@-example.com',
    'a@exam_ple.com',
    'a@example..com',
    'a@example.123',
    'a@例え.jp',
    '田中@example.com',
    '"a b"@example.com',
    'a@example.com\r\nBcc: attacker@example.com',
    'a@example.com ',
    ' a@example.com',
    `${'a.'.repeat(5_000)}@example.com`,
  ])('rejects invalid email %s', (email) => {
    const result = v.safeParse(validationSchema, { ...valid, email });
    expect(result.success).toBe(false);
    expect(result.issues?.[0].path?.[0].key).toBe('email');
  });

  it.each(['name', 'email', 'message'] as const)(
    'rejects missing, null, and non-string %s without coercion',
    (field) => {
      for (const value of [undefined, null, 123, false, [], {}]) {
        const result = v.safeParse(validationSchema, {
          ...valid,
          [field]: value,
        });
        expect(result.success).toBe(false);
        expect(result.issues?.[0].path?.[0].key).toBe(field);
      }
      const missing: Partial<typeof valid> = { ...valid };
      delete missing[field];
      expect(v.safeParse(validationSchema, missing).success).toBe(false);
    },
  );

  it.each([null, undefined, [], 'text', 42])(
    'rejects a non-object payload: %s',
    (input) => {
      expect(v.safeParse(validationSchema, input).success).toBe(false);
    },
  );

  it('keeps the name minimum at two UTF-16 code units', () => {
    for (const name of ['', '田', 'a']) {
      expect(v.safeParse(validationSchema, { ...valid, name }).success).toBe(
        false,
      );
    }
    for (const name of ['田中', 'ab', '😀', '  ']) {
      expect(v.safeParse(validationSchema, { ...valid, name }).success).toBe(
        true,
      );
    }
  });

  it('preserves values and strips unknown fields without adding sanitization', () => {
    const input = {
      ...valid,
      name: '  田中  ',
      message: ' <script>alert("test")</script>\n本文 ',
    };
    const payload = {
      ...input,
      ...JSON.parse('{"admin":true,"__proto__":{"polluted":true}}'),
    };
    const output = v.parse(validationSchema, payload);
    expect(output).toEqual(input);
    expect(Object.hasOwn(output, '__proto__')).toBe(false);
    expect(Object.hasOwn(Object.prototype, 'polluted')).toBe(false);
  });

  it('preserves the existing whitespace-only message policy', () => {
    expect(
      v.safeParse(validationSchema, { ...valid, message: '' }).success,
    ).toBe(false);
    expect(
      v.parse(validationSchema, { ...valid, message: ' \n ' }).message,
    ).toBe(' \n ');
  });
});
