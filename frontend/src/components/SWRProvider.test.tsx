import { cleanup, render, screen } from '@testing-library/react';
import useSWR, { SWRConfig } from 'swr';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HttpError } from '../lib/fetchJson';
import SWRProvider from './SWRProvider';

function Probe() {
  const { data, error } = useSWR<{ title: string }, Error>('/projects');
  if (error)
    return (
      <p role="alert">
        {error instanceof HttpError ? error.status : 'Invalid response'}
      </p>
    );
  if (!data) return <p>Loading</p>;
  return <p>{data.title}</p>;
}

function renderProbe() {
  render(
    <SWRConfig value={{ provider: () => new Map(), shouldRetryOnError: false }}>
      <SWRProvider>
        <Probe />
      </SWRProvider>
    </SWRConfig>,
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('shared SWR fetcher', () => {
  it('loads successful responses through the production provider', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{"title":"Portfolio"}')),
    );
    renderProbe();
    expect(await screen.findByText('Portfolio')).toBeTruthy();
  });

  it('exposes HTTP failure to SWR instead of treating its JSON as data', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('{"title":"Not real project data"}', { status: 503 }),
        ),
    );
    renderProbe();
    expect((await screen.findByRole('alert')).textContent).toBe('503');
    expect(screen.queryByText('Not real project data')).toBeNull();
  });

  it('exposes invalid JSON as an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('<html>error</html>')),
    );
    renderProbe();
    expect((await screen.findByRole('alert')).textContent).toBe(
      'Invalid response',
    );
  });
});
