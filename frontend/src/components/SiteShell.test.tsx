// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import SiteShell from './SiteShell';

vi.mock('next/navigation', () => ({
  usePathname: () => '/contact',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('public site shell', () => {
  it('renders navigation, page content, and footer before client effects run', () => {
    const html = renderToString(
      <SiteShell>
        <main>
          <h1>Public portfolio content</h1>
        </main>
      </SiteShell>,
    );

    expect(html).toContain('<header');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/projects"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('<h1>Public portfolio content</h1>');
    expect(html).toContain('<footer');
    expect(html).toContain('JOJI IBA INC.');
    expect(html.match(/<main[\s>]/g)).toHaveLength(1);
  });
});
