# Antigravity Workspace Rule: Tee Labs Project Directives

This project is an e-commerce platform for printed and custom-designed t-shirts built with Next.js App Router, Tailwind CSS v3, and Bun.

## Mandatory Rules & Guidelines

1. **Package Manager: Strictly Bun**
   - Always run commands with `bun`: `bun run dev`, `bun run build`, `bun add <pkg>`.
   - Never use `npm`, `yarn`, or `pnpm`.

2. **Tailwind Version Constraint (DO NOT UPGRADE TO V4)**
   - The project uses `tailwindcss@^3.4.17` (Tailwind v3).
   - Upgrading to Tailwind v4 breaks Shadcn/ui variables, `@apply border-border`, and `tailwindcss-animate`. Keep Tailwind on v3 and keep `postcss.config.mjs` configured with `tailwindcss` and `autoprefixer`.

3. **Theme & Styling Tokens**
   - **Font**: Manrope only (`wght@400;500;600;700;800`).
   - **Background Color**: `#F8F8F9` (Athens Gray).
   - **Primary Color**: `#106EBE` (Blue).
   - **Secondary / Accent Color**: `#a28300` (Pirate Gold).
   - Maintain both desktop and mobile layouts (mobile uses sticky `MobileBottomNav`).

4. **Component Architecture**
   - Do not write monolithic files. Extract reusable sections and modules into `components/`.
   - Use `"use client"` on interactive components and hooks.
   - Use `@/` import aliases.

5. **Build & Error Verification**
   - Verify all non-trivial changes with `bun run build`.
   - Zero Turbopack compile errors and zero TypeScript errors must be maintained.
