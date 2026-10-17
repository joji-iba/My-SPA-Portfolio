// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchJson, HttpError } from './fetchJson';

afterEach(() => vi.unstubAllGlobals());

describe('fetchJson', () => {
  it('passes request options through and returns parsed JSON', async () => {
    const controller = new AbortController();
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"value":42}'));
    vi.stubGlobal('fetch', fetchMock);
    const init = {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    };
    expect(await fetchJson('/projects', init)).toEqual({ value: 42 });
    expect(fetchMock).toHaveBeenCalledWith('/projects', init);
  });

  it.each([400, 401, 403, 404, 429, 500, 503])(
    'rejects HTTP %i even when the body looks successful',
    async (status) => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('{"status":1}', { status })),
      );
      await expect(fetchJson('/projects')).rejects.toMatchObject({
        name: 'HttpError',
        status,
      });
    },
  );

  it('keeps the HTTP status when an error body is not JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('<html>bad gateway</html>', { status: 502 }),
        ),
    );
    await expect(fetchJson('/projects')).rejects.toBeInstanceOf(HttpError);
    await expect(fetchJson('/projects')).rejects.toMatchObject({ status: 502 });
  });

  it('rejects invalid JSON on a successful HTTP response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('not JSON')));
    await expect(fetchJson('/projects')).rejects.toBeInstanceOf(SyntaxError);
  });

  it('propagates network and abort failures without retrying', async () => {
    for (const error of [
      new TypeError('offline'),
      new DOMException('aborted', 'AbortError'),
    ]) {
      const fetchMock = vi.fn().mockRejectedValue(error);
      vi.stubGlobal('fetch', fetchMock);
      await expect(fetchJson('/projects')).rejects.toBe(error);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    }
  });
});
