# Contributing

## Setup

```bash
npm install
npm run dev
```

## Workflow

1. Branch from the latest default branch.
2. Make your change.
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/) — a `commit-msg` hook enforces this:
   ```
   feat: add product filters to catalog page
   fix: correct discount calculation on sale items
   chore: bump dependencies
   ```
4. A `pre-commit` hook runs `lint-staged`, which lints and formats staged files automatically.
5. Open a pull request. CI runs lint, type checks, unit tests, e2e tests, and a production build on every PR.

## Available scripts

| Script                 | Purpose                           |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the dev server              |
| `npm run build`        | Production build                  |
| `npm run lint`         | ESLint                            |
| `npm run typecheck`    | TypeScript, no emit               |
| `npm test`             | Unit/component tests (Vitest)     |
| `npm run test:watch`   | Unit tests in watch mode          |
| `npm run test:e2e`     | End-to-end tests (Playwright)     |
| `npm run format`       | Format the codebase with Prettier |
| `npm run format:check` | Check formatting without writing  |

## UI components

This project uses [shadcn/ui](https://ui.shadcn.com) conventions: components live as plain source
in `src/components/ui/` and are meant to be edited directly rather than treated as an opaque
dependency. `components.json` documents the configured style/aliases for the `shadcn` CLI.
