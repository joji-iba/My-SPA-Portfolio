import type tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
} satisfies {
  plugins: {
    '@tailwindcss/postcss': NonNullable<Parameters<typeof tailwindcss>[0]>;
  };
};
