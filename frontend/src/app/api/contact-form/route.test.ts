// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { sendMail, createTransport } = vi.hoisted(() => ({
  sendMail: vi.fn(),
  createTransport: vi.fn(),
}));
vi.mock('nodemailer', () => ({ default: { createTransport } }));

import { POST } from './route';

const base = 'https://portfolio.example';
const templates = [
  ['/email-templates/template.html', '<html>%BODY%</html>'],
  [
    '/email-templates/customer.html',
    '<p>Customer %NAME% %EMAIL% %MESSAGE%</p>',
  ],
  ['/email-templates/admin.html', '<p>Admin %NAME% %EMAIL% %MESSAGE%</p>'],
  ['/email-templates/customer.txt', 'Customer %NAME% %EMAIL% %MESSAGE%'],
  ['/email-templates/admin.txt', 'Admin %NAME% %EMAIL% %MESSAGE%'],
] as const;
const input = {
  name: '田中',
  email: 'test@example.com',
  message: '相談です。',
};
const fetchMock = vi.fn<typeof fetch>();

function request() {
  return new Request(`${base}/api/contact-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue({ messageId: 'test-only' });
  createTransport.mockReset().mockReturnValue({ sendMail });
  fetchMock.mockReset().mockImplementation(async (url) => {
    const match = templates.find(([path]) => `${base}${path}` === url);
    if (!match) throw new Error(`Unexpected request: ${url}`);
    return new Response(match[1]);
  });
  vi.stubGlobal('fetch', fetchMock);
  vi.stubEnv('NEXT_PUBLIC_BASE_URL', base);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('contact route template fetching', () => {
  it('reads all templates as text and preserves both outgoing messages', async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 1 });
    expect(fetchMock.mock.calls).toEqual(
      templates.map(([path]) => [`${base}${path}`, { cache: 'no-store' }]),
    );
    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(sendMail).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        to: '田中 <test@example.com>',
        subject: 'お問い合わせありがとうございます。',
        html: '<html><p>Customer 田中 test@example.com 相談です。</p></html>',
        text: 'Customer 田中 test@example.com 相談です。',
      }),
    );
    expect(sendMail).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: '田中 <test@example.com>',
        subject: '【ポートフォリオサイトからのお問い合わせ】',
        html: '<html><p>Admin 田中 test@example.com 相談です。</p></html>',
        text: 'Admin 田中 test@example.com 相談です。',
      }),
    );
  });

  it.each(templates.map(([path]) => path))(
    'sends no email when template %s returns HTTP 404',
    async (failedPath) => {
      fetchMock.mockImplementation(async (url) => {
        const match = templates.find(([path]) => `${base}${path}` === url)!;
        return new Response(match[1], {
          status: url === `${base}${failedPath}` ? 404 : 200,
        });
      });
      const response = await POST(request());
      expect(response.status).toBe(500);
      expect(await response.json()).toMatchObject({ status: 0 });
      expect(sendMail).not.toHaveBeenCalled();
    },
  );

  it('does not send an upstream HTTP 500 error page as a template', async () => {
    fetchMock.mockResolvedValue(
      new Response('<html>upstream error</html>', { status: 500 }),
    );
    const response = await POST(request());
    expect(response.status).toBe(500);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('does not send or retry when template fetching fails on the network', async () => {
    fetchMock.mockRejectedValue(new TypeError('offline'));
    const response = await POST(request());
    expect(response.status).toBe(500);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('does not report success or retry if the mail transport fails', async () => {
    sendMail.mockRejectedValue(new Error('SMTP unavailable'));
    const response = await POST(request());
    expect(response.status).toBe(500);
    expect(await response.json()).toMatchObject({ status: 0 });
    expect(sendMail).toHaveBeenCalledTimes(1);
  });
});
