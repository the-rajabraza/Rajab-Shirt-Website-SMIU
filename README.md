# shirt-design-raza
## Rajab Shirt Website

A Next.js + Tailwind CSS storefront template for designing and selling shirts.

This repository contains the source for a small e-commerce demo built with Next.js, React and Tailwind. The README previously contained references to automatic deployments and v0.dev/Vercel — those references have been removed.

## Quick start (local)

Prerequisites: Node.js (18+ recommended) and a package manager (npm, pnpm or bun).

Install dependencies:

```powershell
npm install
# or with pnpm: pnpm install
# or with bun: bun install
```

Run the development server:

```powershell
npm run dev
# or pnpm run dev
# or bun run dev
```

Open http://localhost:3000 in your browser to view the site.

## Build and start (production)

```powershell
npm run build
npm run start
```

## Project structure (high level)

- `app/` - Next.js app routes and pages
- `components/` - Reusable UI components
- `lib/`, `hooks/`, `contexts/` - Utilities, custom hooks and React contexts
- `public/` - Static assets
- `styles/` - Global styles and Tailwind setup

## Deployment


This project is a standard Next.js app and can be deployed to any hosting that supports Node/Next.js (for example Netlify, AWS, or a custom server). No automatic v0.dev integrations are included in this repository.

Recommended quick options:

- Netlify: supports Next.js with adapter/plugins
- Docker: build and run a container for custom infra

## Notes

- I removed v0.dev and Vercel-specific badges and links from this README per your request.
- If you want, I can add a deployment guide for a specific provider (Vercel, Netlify, Docker, etc.).

## License

See the repository root or add a LICENSE file if you want to specify a license.
