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

## Next.js and TypeScript

Use Node.js 22. Next.js and its ESLint configuration are pinned to 16.4.2;
the application compiler is TypeScript 7.0.2. Run the following from `frontend/`:

```sh
npm ci
npm run typecheck
npm run lint
npm test -- --run
npm run build
```

`typecheck` generates Next.js route types before running TypeScript 7. The build
also checks types through `experimental.useTypeScriptCli`; type errors are not
ignored. `baseUrl` was removed because TypeScript 7 no longer accepts it; the
existing `@/*` paths remain relative to `tsconfig.json`.

TypeScript 7 does not provide the legacy compiler API used by typescript-eslint.
The private `tooling/eslint-config` npm workspace therefore contains TypeScript
6.0.3 and `eslint-config-next`. The scoped override keeps the whole ESLint config
dependency tree on that API, while `tsc` and Next.js resolve the root TypeScript
7.0.2 package. Install from `frontend/` so npm installs both workspaces together;
Docker copies the tooling workspace before installing dependencies as well.
Compose keeps its nested dependencies in a separate named volume so the source
bind mount does not hide the installed TypeScript 6 API.
This compatibility package can be removed once typescript-eslint supports the
new API. See Microsoft's [TypeScript 7 migration notes](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

TypeScript 7's editor language service does not yet support language-service
plugins, including Next.js's editor plugin. This does not disable CLI or build
type checking.

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
