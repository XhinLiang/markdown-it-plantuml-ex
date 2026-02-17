# Contributing

Thanks for contributing to `markdown-it-plantuml-ex`.

## Prerequisites

- Node.js 20+
- Java available on `PATH`

## Local setup

```bash
npm ci
```

## Quality checks

Run the full local gate before opening a pull request:

```bash
npm run verify
```

Individual commands:

- `npm run format`
- `npm run format:check`
- `npm run lint`
- `npm run lint:fix`
- `npm test`

## Pull requests

- Use a focused branch and clear commit messages.
- Keep changes scoped and include tests when behavior changes.
- Update docs when changing public behavior or contributor workflow.
- Ensure CI is green before requesting review.

## Reporting security issues

Please do not file public issues for security vulnerabilities.
Contact the maintainers directly.
