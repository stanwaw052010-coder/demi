# Installed Claude Code skills

These are [Agent Skills](https://docs.claude.com/en/docs/claude-code/skills) — `SKILL.md` files
that Claude Code loads automatically based on context — curated from
[awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) for this project's
stack (Next.js, React, TypeScript, Playwright/Vitest, shadcn/ui). Each one was selected because
it is actively maintained and directly applicable to building, testing, securing, or shipping
this site; generic/unrelated entries (DevOps, mobile, ML, niche backend frameworks, etc.) were
skipped.

| Skill                  | Source                                                                      | Why it's here                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `nextjs-developer`     | [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills)       | App Router, server components/actions, `generateMetadata`, streaming, deployment — this is a Next.js 16 App Router site.        |
| `react-expert`         | jeffallan/claude-skills                                                     | Hooks, React 19 features, state management, performance, RTL testing patterns.                                                  |
| `typescript-pro`       | jeffallan/claude-skills                                                     | Advanced types, generics, type guards for the strict-mode TypeScript codebase.                                                  |
| `javascript-pro`       | jeffallan/claude-skills                                                     | Modern ES/async patterns, browser APIs used throughout client components.                                                       |
| `playwright-expert`    | jeffallan/claude-skills                                                     | E2E test authoring, page objects, fixtures, flake debugging — matches the Playwright suite in `e2e/`.                           |
| `test-master`          | jeffallan/claude-skills                                                     | Test strategy, coverage analysis, unit/integration/E2E design — matches the Vitest suite.                                       |
| `code-reviewer`        | jeffallan/claude-skills                                                     | Structured PR review (bugs, security, code smells) for the Conventional Commits / PR-based git workflow.                        |
| `security-reviewer`    | jeffallan/claude-skills                                                     | Vulnerability audits with severity ratings — relevant for an e-commerce site handling cart/order/contact data.                  |
| `secure-code-guardian` | jeffallan/claude-skills                                                     | Input validation, auth, OWASP Top 10 prevention for forms (contact, checkout).                                                  |
| `debugging-wizard`     | jeffallan/claude-skills                                                     | Systematic, hypothesis-driven debugging for stack traces and runtime errors.                                                    |
| `feature-forge`        | jeffallan/claude-skills                                                     | Structured requirements/spec writing for new UI/UX features before implementation.                                              |
| `fullstack-guardian`   | jeffallan/claude-skills                                                     | End-to-end feature implementation (UI + data + security) in one pass.                                                           |
| `web-asset-generator`  | [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator) | Generates favicons, PWA icons, and Open Graph images — complements the SEO metadata already configured in `src/app/layout.tsx`. |

All sources are MIT-licensed. Nothing here runs automatically — Claude Code loads a skill's
`SKILL.md` into context only when the task at hand matches its description, and `web-asset-generator`'s
Python scripts only execute when that skill is actually invoked.
