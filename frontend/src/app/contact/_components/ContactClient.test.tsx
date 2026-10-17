import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactClient } from './ContactClient';

const fetchMock = vi.fn<typeof fetch>();
const valid = {
  name: '田中 太郎',
  email: "o'connor+contact@example.com",
  message: 'お問い合わせ\nよろしくお願いします。',
};

function fillForm(values = valid) {
  fireEvent.change(screen.getByPlaceholderText('田中 太郎'), {
    target: { value: values.name },
  });
  fireEvent.change(screen.getByPlaceholderText('sample@gmail.com'), {
    target: { value: values.email },
  });
  fireEvent.change(
    screen.getByPlaceholderText('お問い合わせ内容を入力してください。'),
    {
      target: { value: values.message },
    },
  );
}

function submitForm() {
  // Deliberately bypass browser-native validation to exercise the resolver.
  const form = screen.getByRole('button', { name: '送信する' }).closest('form');
  if (!form) throw new Error('Contact form is missing');
  fireEvent.submit(form);
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('contact form with React Hook Form and Valibot', () => {
  it('blocks empty and invalid submissions, then clears errors and sends corrected values', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ status: 1 })));
    render(<ContactClient />);
    submitForm();

    await screen.findByText('※お名前は必須です。');
    expect(screen.getByText('※メールアドレスは必須です。')).toBeTruthy();
    expect(screen.getByText('※お問い合わせ内容は必須です。')).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();

    fillForm({ name: '田', email: 'invalid', message: valid.message });
    await screen.findByText('お名前は2文字以上で入力して下さい。');
    expect(
      screen.getByText('正しいメールアドレスを入力して下さい。'),
    ).toBeTruthy();
    submitForm();
    await waitFor(() => {
      expect(screen.queryByText('※お問い合わせ内容は必須です。')).toBeNull();
    });
    expect(fetchMock).not.toHaveBeenCalled();

    fillForm();
    await waitFor(() => {
      expect(
        screen.queryByText('お名前は2文字以上で入力して下さい。'),
      ).toBeNull();
      expect(
        screen.queryByText('正しいメールアドレスを入力して下さい。'),
      ).toBeNull();
    });
    submitForm();
    await screen.findByText(/この度は、お問い合わせ頂き/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/contact-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(valid),
    });
    expect(screen.queryByRole('button', { name: '送信する' })).toBeNull();
  });

  it('validates on change before submission and clears an email error', async () => {
    render(<ContactClient />);
    fillForm({ ...valid, email: 'bad-email' });
    await screen.findByText('正しいメールアドレスを入力して下さい。');
    fillForm();
    await waitFor(() => {
      expect(
        screen.queryByText('正しいメールアドレスを入力して下さい。'),
      ).toBeNull();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows pending state and allows retry after a network failure', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    let rejectRequest: (reason: Error) => void = () => {};
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((_, reject) => {
          rejectRequest = reject;
        }),
    );
    render(<ContactClient />);
    fillForm();
    submitForm();
    await screen.findByRole('button', { name: '送信中...' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    rejectRequest(new Error('offline'));
    await screen.findByRole('button', { name: '送信する' });
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/この度は、お問い合わせ頂き/)).toBeNull();

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: 1 })),
    );
    submitForm();
    await screen.findByText(/この度は、お問い合わせ頂き/);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not show success when the API rejects the submission', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: 0 })),
    );
    render(<ContactClient />);
    fillForm();
    submitForm();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await screen.findByRole('button', { name: '送信する' });
    expect(screen.queryByText(/この度は、お問い合わせ頂き/)).toBeNull();
  });
});
