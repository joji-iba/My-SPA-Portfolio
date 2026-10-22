## This is my SPA portfolio created using React/Next.js, TypeScript, and TailwindCSS.

Live：[joji-iba-portfolio.vercel.app](https://joji-iba-portfolio.vercel.app/)

- ①Dark mode switching function
- ②Screen transition animation by framer-motion
- ③Inquiry form with React-Hook-Form
- ④Validation management with Valibot
- ⑤G-mail sending function by linking API with nodemailer
- ⑥Authentication function with FireBase

I have implemented many functions using React/Next.js.
I'm planning to implement a number of functions using React/Next.js, such as page implementation with dynamic routing using microCMS.

## Next.js and TypeScript

Use Node.js 24.22.1 (latest supported LTS) and pnpm 12.14.0 (`packageManager` pins the version). React and
React DOM are pinned to 19.3.1, with React type packages at 19.3.0. Next.js is pinned to 16.4.2 and the application compiler is
TypeScript 7.0.2. Biome 2.5.15 handles linting and formatting without a legacy
TypeScript compiler or a separate tooling workspace. Run the following from `frontend/`:

Install pnpm with `npm install --global pnpm@12.14.0` once (npm is only used
to bootstrap pnpm), then use pnpm for all project commands. When switching an
existing checkout from npm, remove its `frontend/node_modules` before installing.

```sh
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run ci
pnpm test --run
pnpm run build
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
| `pnpm run ci` | Read-only lint and formatting checks used in CI |
| `pnpm run check` | The same checks for local development |
| `pnpm run lint` | Lint only |
| `pnpm run format:check` | Check formatting without editing files |
| `pnpm run format` | Format supported files |
| `pnpm run fix` | Format and apply safe lint fixes (no unsafe fixes) |

`biome.json` is the single configuration. It retains two-space indentation,
single quotes in JavaScript, double quotes in JSX, semicolons, trailing commas,
LF endings, and an 80-column target. Import sorting stays disabled, matching
the previous `import/order` policy. Tailwind v4 directives are parsed explicitly.
Checks cover source and frontend configuration files, including tests. Generated
Next.js files, dependencies, build outputs, public assets/templates, and the pnpm
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

Open `frontend/` as the VS Code workspace (or as a folder in a multi-root
workspace). Its `.vscode/settings.json` selects the official Biome extension,
formats supported frontend languages on save, and applies safe fixes. The
extension discovers the local Biome package and configuration automatically.
The old repository-root `.vscode/setting.json` had the wrong filename and has
been removed. Backend and infrastructure editor settings are unaffected.

## Tailwind CSS v4

`src/styles/globals.css` is the single Tailwind entry point. PostCSS uses
`@tailwindcss/postcss`; the existing colors, fonts, backgrounds, and class-based
dark mode are loaded explicitly with `@config '../../tailwind.config.ts'`.

Responsive layouts use `max-*` variants: `max-lg:` applies below 1024px,
`max-md:` below 768px, `max-sm:` below 640px, and `max-xs:` below 480px.
These replace the old maximum-width `lg:`, `md:`, `sm:`, and `xs:` variants
and preserve the ordering of narrower overrides.

Validate with `pnpm install --frozen-lockfile`, `pnpm test --run`, `pnpm run ci`, and `pnpm run build`
on Node.js 24.22.1. Tailwind v4 requires Safari 16.4+, Chrome 111+, or Firefox 128+;
see the [upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

## Contact form validation

The contact form uses Valibot 1.5.0, React Hook Form 7.90.0, and
`@hookform/resolvers` 5.9.2. `ContactForm` is inferred from the schema in
`src/utils/validationSchema.ts`.

The migration preserves required-field messages, the two-character name minimum
(JavaScript string length), and submitted values without trimming or coercion.
The email check intentionally retains the previous regular expression: Valibot's
`email()` has different acceptance rules, including rejecting local-part
apostrophes previously accepted by the form. Default diagnostics for non-string
values come from Valibot; normal form inputs retain their Japanese messages.

Run `pnpm test --run` for schema boundary cases and the actual form/resolver
integration, including rejected submissions, correction of errors, submission
payloads, and retry after a network failure. These tests mock fetch and do not
send email.

## HTTP requests and SWR

HTTP requests use the platform `fetch`; Axios and the unused project API wrapper
have been removed. `src/lib/fetchJson.ts` checks `response.ok` before parsing JSON,
so HTTP failures (including JSON error bodies), malformed JSON, and network
failures reach SWR's error state. The shared SWR provider uses this fetcher for
project reads and retains its existing revalidation settings.

The contact form uses `useSWRMutation` with an explicit POST fetcher. Success
requires both a successful HTTP status and a JSON body with numeric `status: 1`.
SWR manages pending, error, and success state. Sending disables the button and a
synchronous guard blocks duplicate submit events. Errors appear inline and keep
the input values; retry is manual. Focus/reconnect does not resend the POST, and
mutation revalidation is disabled. A failed or unreadable response can occur after
email was accepted, so the error message explains that retrying can duplicate it.
This is a client-side duplicate guard, not server-side idempotency.

The Next.js contact route fetches its five mail templates with `cache: 'no-store'`
and reads them as text. Any template HTTP/network failure stops the route before
sending email. The SMTP behavior and endpoint remain unchanged.

`pnpm test --run` covers the production SWR provider, the real contact component
and mutation hook, and the route with mocked fetch/SMTP. No real email is sent.

## Package management and deployment

`pnpm-lock.yaml` is the only frontend lockfile. Install with
`pnpm install --frozen-lockfile`; dependency updates intentionally use `pnpm add`,
`pnpm update`, or `pnpm remove` and commit both the manifest and lockfile.
`pnpm-workspace.yaml` enables strict peer checks and allows only the listed
packages' installation scripts. Review new build scripts before allowing them.
Uninstalled manifest changes fail before scripts run; run install explicitly.
The release-age exception is limited to `@hookform/resolvers@5.9.2`, already
validated and merged before this migration; other packages retain pnpm's default
release-age policy.

CI uses the pinned pnpm version, checks peers, types, Biome, tests, and production
builds, and builds both Docker images with production HTTP and development bind-mount
smoke tests.
Docker also pins pnpm 12.14.0. Compose uses a new `frontend_pnpm_node_modules`
volume so an old npm dependency volume cannot mask the pnpm installation. Rebuild
with `docker compose up --build frontend-nextjs` after switching.

Vercel's project root is `frontend/`, where `vercel.json` specifies a frozen install
and build through pinned pnpm. The root configuration mirrors those commands.
`npx` only bootstraps pnpm; it does not install application dependencies. This
avoids relying on Vercel's default pnpm version or an extra dashboard setting.
When changing pnpm versions, update `packageManager`, both Dockerfiles, and both
Vercel configurations together.

Unused direct dependencies removed: Heroicons, PropTypes, React Intersection
Observer, styled-components (including its types and Next.js compiler option),
the three legacy Babel proposal plugins, SVGR, tsconfig-paths-webpack-plugin,
and the direct esbuild entry. Optional tool peers are not added unless the project needs them.
Type declarations, TypeScript, and Tailwind build dependencies are development
dependencies. `@testing-library/dom` remains a required testing-library peer.

## Node.js runtime

The package is named `2026_portfolio`. Volta, GitHub Actions, and both Docker
images pin Node.js 24.22.1. `engines.node` selects `24.x` for Vercel, which manages
patch/minor updates within that major. pnpm enforces the engine range during
installation, so switch Node versions before installing dependencies.

Node.js 24.22.1 is the October 21, 2026 security release, including high-severity
fixes in TLS, DNS, and Brotli. See the [24.22.1 release notes](https://nodejs.org/en/blog/release/v24.22.1).
This project uses Node.js 24 LTS to keep local, container, CI, and hosted runtime
majors aligned.
See [Node.js releases](https://nodejs.org/en/about/previous-releases) and
[Vercel runtime support](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

`src/styles/globals.css` is the Tailwind/PostCSS build entry point, imported once
by the root layout. Its import, theme directives, and global base rules are
compiled into CSS at build time. It is intentionally kept as CSS; moving those
strings into TSX would need a different styling/build integration and would not
remove the need to generate CSS for the browser.

## TypeScript configuration files

Next.js, PostCSS, Tailwind, and the Firebase client initialization use `.ts`
files. The TypeScript project includes root `*.config.ts` files, so the CI
`typecheck` covers configuration as well as application code. JavaScript input
is disabled with `allowJs: false`. Next.js and Tailwind configurations use their
exported types; Firebase options and Tailwind's PostCSS plugin options are also
checked without adding runtime dependencies.

The project uses Turbopack (`next dev` / `next build`), which discovers
`postcss.config.ts`. Tailwind loads `tailwind.config.ts` through the explicit
`@config` directive in `globals.css`.
