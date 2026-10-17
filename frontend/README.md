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

Use Node.js 22. Next.js is pinned to 16.4.2 and the application compiler is
TypeScript 7.0.2. Biome 2.5.15 handles linting and formatting without a legacy
TypeScript compiler or a separate tooling workspace. Run the following from `frontend/`:

```sh
npm ci
npm run typecheck
npm run ci
npm test -- --run
npm run build
```

`typecheck` generates Next.js route types before running TypeScript 7. The build
also checks types through `experimental.useTypeScriptCli`; type errors are not
ignored. `baseUrl` was removed because TypeScript 7 no longer accepts it; the
existing `@/*` paths remain relative to `tsconfig.json`.

TypeScript 7's editor language service does not yet support language-service
plugins, including Next.js's editor plugin. This does not disable CLI or build
type checking.

## Linting and formatting with Biome

Run these commands from `frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run ci` | Read-only lint and formatting checks used in CI |
| `npm run check` | The same checks for local development |
| `npm run lint` | Lint only |
| `npm run format:check` | Check formatting without editing files |
| `npm run format` | Format supported files |
| `npm run fix` | Format and apply safe lint fixes (no unsafe fixes) |

`biome.json` is the single configuration. It retains two-space indentation,
single quotes in JavaScript, double quotes in JSX, semicolons, trailing commas,
LF endings, and an 80-column target. Import sorting stays disabled, matching
the previous `import/order` policy. Tailwind v4 directives are parsed explicitly.
Checks cover source and frontend configuration files, including tests. Generated
Next.js files, dependencies, build outputs, public assets/templates, and the npm
lockfile are excluded. Markdown documentation is not formatted by this setup.

The lint rules were migrated from the previous ESLint configuration, including
Hooks ordering/dependencies, JSX keys/duplicates, accessibility checks, and the
supported Next.js rules. The preset is `none` to retain the project's existing
rule policy rather than silently enabling unrelated style rules. Former warnings
remain warnings; errors fail CI. ESLint, Prettier, their plugins, the unused hook
tool packages, and the TypeScript 6 compatibility workspace are removed.

This is not one-to-one rule coverage: Biome does not implement all of the
React Compiler diagnostics from `eslint-plugin-react-hooks`, or every legacy
Next.js/React rule (such as `no-html-link-for-pages`, `no-css-tags`,
`no-page-custom-font`, `display-name`, and `no-unescaped-entities`). TypeScript 7
and `next build` remain separate required CI checks; they do not replace those
missing lint rules. See [Biome's migration guide](https://biomejs.dev/installation/migrate-eslint-prettier/).

Use the official Biome editor extension with `frontend/biome.json`; remove local
ESLint/Prettier format-on-save overrides if you have configured them.

## Tailwind CSS v4

`src/styles/globals.css` is the single Tailwind entry point. PostCSS uses
`@tailwindcss/postcss`; the existing colors, fonts, backgrounds, and class-based
dark mode are loaded explicitly with `@config '../../tailwind.config.js'`.

Responsive layouts use `max-*` variants: `max-lg:` applies below 1024px,
`max-md:` below 768px, `max-sm:` below 640px, and `max-xs:` below 480px.
These replace the old maximum-width `lg:`, `md:`, `sm:`, and `xs:` variants
and preserve the ordering of narrower overrides.

Validate with `npm ci`, `npm test -- --run`, `npm run ci`, and `npm run build`
on Node.js 22. Tailwind v4 requires Safari 16.4+, Chrome 111+, or Firefox 128+;
see the [upgrade guide](https://tailwindcss.com/docs/upgrade-guide).
