// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import postcss, { type Root, type Rule, type AtRule } from 'postcss';
import { beforeAll, describe, expect, it } from 'vitest';
import config from '../../postcss.config.js';

describe('compiled portfolio styles', () => {
  let css: Root;

  beforeAll(async () => {
    const from = fileURLToPath(new URL('./globals.css', import.meta.url));
    const plugins = await Promise.all(
      Object.entries(config.plugins).map(async ([name, options]) => {
        const { default: plugin } = await import(name);
        return plugin(options);
      }),
    );
    const result = await postcss(plugins).process(
      await readFile(from, 'utf8'),
      {
        from,
      },
    );
    css = result.root;
  });

  function rule(selector: string): Rule {
    let match: Rule | undefined;
    css.walkRules(selector, (node) => {
      match = node;
    });
    expect(match, `Missing generated selector: ${selector}`).toBeDefined();
    return match!;
  }

  function value(selector: string, property: string) {
    let found: string | undefined;
    rule(selector).walkDecls(property, (decl) => {
      found = decl.value;
    });
    return found;
  }

  it('retains brand colors, the Next.js font, and the skill backgrounds', () => {
    expect(value('.bg-dark', 'background-color')).toBe('#1b1b1b');
    expect(value('.text-errorRed', 'color')).toBe('#e3342f');
    expect(value('.font-mont', 'font-family')).toContain('var(--font-mont)');
    expect(value('.bg-circularLight', 'background-image')).toContain(
      'repeating-radial-gradient',
    );
  });

  it('activates dark colors with the theme class instead of OS preference', () => {
    expect(value('.dark\\:bg-dark:is(.dark *)', 'background-color')).toBe(
      '#1b1b1b',
    );
    expect(css.toString()).not.toContain('prefers-color-scheme');
  });

  it('orders narrower layout overrides after wider ones', () => {
    const selectors = [
      ['.max-xl\\:p-24', '1280px'],
      ['.max-lg\\:p-16', '1024px'],
      ['.max-md\\:p-12', '768px'],
      ['.max-sm\\:p-8', '640px'],
      ['.max-xs\\:p-2', '480px'],
    ];
    const output = css.toString();
    let previous = -1;
    for (const [selector, width] of selectors) {
      const media = rule(selector).parent as AtRule;
      expect(media.name).toBe('media');
      expect(media.params).toBe(`(width < ${width})`);
      const position = output.indexOf(selector);
      expect(position).toBeGreaterThan(previous);
      previous = position;
    }
  });

  it('keeps mobile heading overrides important after migration', () => {
    const heading = rule('.max-sm\\:text-3xl\\!');
    const declarations: boolean[] = [];
    heading.walkDecls('font-size', (decl) => {
      declarations.push(Boolean(decl.important));
    });
    expect(declarations).toEqual([true]);
  });
});
