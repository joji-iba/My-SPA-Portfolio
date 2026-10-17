## This is my SPA portfolio created using React/Next.js, TypeScript, and TailwindCSS.

Live：[joji-iba-portfolio.vercel.app](https://joji-iba-portfolio.vercel.app/)

- ①Dark mode switching function
- ②Screen transition animation by framer-motion
- ③Inquiry form with React-Hook-Form
- ④Validation management by introducing zod
- ⑤G-mail sending function by linking API with nodemailer
- ⑥Authentication function with FireBase

I have implemented many functions using React/Next.js.
I'm planning to implement a number of functions using React/Next.js, such as page implementation with dynamic routing using microCMS.

## Tailwind CSS v4

`src/styles/globals.css` is the single Tailwind entry point. PostCSS uses
`@tailwindcss/postcss`; the existing colors, fonts, backgrounds, and class-based
dark mode are loaded explicitly with `@config '../../tailwind.config.js'`.

Responsive layouts use `max-*` variants: `max-lg:` applies below 1024px,
`max-md:` below 768px, `max-sm:` below 640px, and `max-xs:` below 480px.
These replace the old maximum-width `lg:`, `md:`, `sm:`, and `xs:` variants
and preserve the ordering of narrower overrides.

Validate with `npm ci`, `npm test -- --run`, `npm run lint`, and `npm run build`
on Node.js 22. Tailwind v4 requires Safari 16.4+, Chrome 111+, or Firefox 128+;
see the [upgrade guide](https://tailwindcss.com/docs/upgrade-guide).
