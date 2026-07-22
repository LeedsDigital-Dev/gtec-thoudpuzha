# GTEC Thodupuzha

Multi-tenant web platform for GTEC Thodupuzha: a public marketing site, student portal, job portal, and admin system.

Built with [Next.js](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

## Prerequisites

- Node.js >= 20.9 (see `.nvmrc`)
- npm

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |
| `npm run format` | Format code with Prettier |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

See `.env.example` for the full list of required variables. Up-to-date descriptions of each variable are maintained in `AGENTS.md`.

## Project Structure

```
src/
├── app/
│   ├── (public)/      # Public marketing site routes
│   ├── (portal)/      # Student & Employer portal routes (auth required)
│   └── (admin)/       # Admin routes (Super Admin & Centre Staff)
├── components/
│   └── ui/            # shadcn/ui components
├── lib/
│   └── utils.ts       # shadcn/ui utility
└── __tests__/         # Vitest smoke tests
```

## Deployment

Connected to Vercel — pushes to `main` deploy automatically. Preview deployments are created on PRs.

## License

Private — GTEC Thodupuzha.
