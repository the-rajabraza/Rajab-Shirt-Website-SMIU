# AGENTS.md — Antigravity IDE Project Instructions & Knowledge Base

> **Project**: Tee Labs (Rajab Shirt Website)  
> **Repository Root**: `e:\rajab-shirt-website`  
> **Scope**: Architecture, guidelines, tech stack constraints, design system, and operational commands for Google Antigravity IDE and AI agents.

---

## 1. Project Overview & Mission

**Tee Labs** is a modern e-commerce web application specializing in:
1. **Ready-to-wear printed premium quality t-shirts**: Catalog browsable by categories (Featured, New Arrivals, Best Sellers, Abstract Art, Nature, Geometric, etc.).
2. **Interactive Custom T-Shirt Design Studio**: Allows customers to upload their own artwork (PNG/JPG/SVG), select shirt colors/sizes, and visually manipulate the design (drag, resize, rotate) directly on a t-shirt mockup canvas using `react-moveable`.
3. **Full Checkout & Order Management**: Seamless shopping cart, localized Pakistani checkout flow (Cash on Delivery, Cards, Mobile Wallets), order confirmation, interactive order tracking pipeline, and transactional email confirmations via Nodemailer.

---

## 2. Package Manager & Runtime (BUN ONLY)

This project strictly utilizes **Bun** (`v1.3+`) as its package manager and script runner.

### Command Reference
- **Start Dev Server**: `bun run dev` (Runs Next.js with Turbopack on `http://localhost:3000`)
- **Production Build**: `bun run build` (Compiles with Turbopack and static optimization)
- **Start Production Server**: `bun run start`
- **Install Dependencies**: `bun install`
- **Add Dependency**: `bun add <package-name>`
- **Add Dev Dependency**: `bun add -d <package-name>`
- **Remove Dependency**: `bun remove <package-name>`

> [!IMPORTANT]
> **NEVER** use `npm`, `yarn`, or `pnpm` in this repository unless explicitly instructed by the user. Always use `bun`.

---

## 3. Technology Stack & Key Dependencies

| Layer | Technology | Version / Details |
| :--- | :--- | :--- |
| **Framework** | Next.js | `16.4.2` (App Router, Turbopack, React Server Components) |
| **Runtime / Library** | React & React DOM | `^19.3.1` |
| **Language** | TypeScript | `^7.0.2` with `"jsx": "react-jsx"` |
| **Styling** | Tailwind CSS | **`^3.4.17` (Tailwind v3 STRICT)** |
| **CSS Preprocessor** | PostCSS + Autoprefixer | `postcss: ^8.5.31`, `autoprefixer: ^10.6.1` |
| **UI Components** | Radix UI / Shadcn UI | Accordion, Dialog, Sheet, Popover, Select, Tabs, etc. |
| **Icons** | Lucide React | `^1.60.0` |
| **Customizer Canvas** | `react-moveable` | `^0.56.0` (Interactive drag, resize, rotate canvas) |
| **Notifications** | Sonner | `^2.0.8` (`<Toaster />` in root layout) |
| **Email Service** | Nodemailer | `^10.1.7` (SMTP-based transactional order emails) |
| **Forms & Validation** | React Hook Form & Zod | Form handling with typed schemas |

---

## 4. Critical Architecture Constraints & Gotchas

### ⚠️ Tailwind CSS Version Pinning (DO NOT UPGRADE TO TAILWIND V4)
- **Rule**: The project is intentionally configured for **Tailwind CSS v3** (`tailwindcss@^3.4.17`).
- **Why**: The project codebase, Shadcn UI setup, `globals.css` (`@tailwind base; @tailwind components; @tailwind utilities;`), utility classes (`border-border`), and `tailwindcss-animate` rely on Tailwind v3 syntax. Upgrading to Tailwind v4 will break the PostCSS pipeline and invalidate Shadcn variables.
- **PostCSS Config** (`postcss.config.mjs`):
  ```javascript
  /** @type {import('postcss-load-config').Config} */
  const config = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  export default config;
  ```

### ⚠️ Next.js Configuration (`next.config.mjs`)
- Do **not** add an `eslint` object in `next.config.mjs`. In Next.js 15+, the `eslint` key is deprecated/invalid and will trigger build warnings.
- Keep `typescript: { ignoreBuildErrors: true }` and `images: { unoptimized: true }` as configured unless directed otherwise.

---

## 5. Design System & Theming Specifications

### Typography
- **Sole Font**: **Manrope** (`wght@400;500;600;700;800`).
- Loaded in `app/layout.tsx` via Google Fonts.
- Configured in `tailwind.config.ts` under `fontFamily.sans`.

### Color Palette Tokens
| Token | Hex / Value | Description |
| :--- | :--- | :--- |
| **Background** | `#F8F8F9` | Athens Gray (Overall app background) |
| **Primary** | `#106EBE` | Vibrant Brand Blue |
| **Secondary / Accent** | `#a28300` | Pirate Gold / Warm Accent |
| **Foreground** | `hsl(var(--foreground))` | High-contrast text |
| **Card / Popover** | `hsl(var(--card))` | Surface colors with CSS variable theming |
| **Border / Input** | `hsl(var(--border))` | Clean, subtle boundary dividers |

### Layout & Responsiveness
- **Mobile First & Desktop Optimized**: Every page must look exceptional across mobile (360px - 480px), tablet (768px), and desktop (1024px+).
- **Navigation Structure**:
  - Desktop: Top `Header` with logo, search bar, navigation links, and floating cart sheet/badge.
  - Mobile: Sticky `MobileBottomNav` with quick-access tabs (Home, Shop, Design, Cart, Account). Bottom padding (`pb-16 md:pb-0`) is applied to `<body>` to prevent content overlap.
  - Footer: Comprehensive footer with newsletter signup, social links, FAQs, returns, and sizing guide triggers.

---

## 6. Directory Structure & Route Architecture

```
e:\rajab-shirt-website/
├── app/                                # Next.js App Router Pages & Endpoints
│   ├── layout.tsx                      # Root layout (Manrope font, CartProvider, Toaster)
│   ├── page.tsx                        # Home page (Hero, Categories, Customizer banner, Testimonials)
│   ├── globals.css                     # Tailwind v3 directives & HSL color tokens
│   ├── shop/
│   │   ├── page.tsx                    # Catalog with filtering (Category, Price, Size) & Skeletons
│   │   └── [category]/[product]/
│   │       └── page.tsx                # Product Details (Image gallery, size selector, add-to-cart)
│   ├── design-your-own-shirt/
│   │   └── page.tsx                    # Interactive Design Studio (Upload + react-moveable canvas)
│   ├── cart/
│   │   └── page.tsx                    # Cart overview, quantity adjustments, checkout trigger
│   ├── checkout/
│   │   └── page.tsx                    # Order form, Pakistani phone input, payment options
│   ├── order-confirmation/
│   │   └── page.tsx                    # Order summary, localStorage persistence, email dispatch
│   ├── track-order/
│   │   └── page.tsx                    # Visual 6-step order tracking timeline
│   ├── terms/
│   │   └── page.tsx                    # Terms of Service & Privacy
│   └── api/
│       └── send-order-email/
│           └── route.ts                # Nodemailer SMTP POST endpoint for customer receipts
├── components/                         # Modular React Components
│   ├── header.tsx                      # Main navigation header with cart badge
│   ├── footer.tsx                      # Global footer with link collections
│   ├── mobile-bottom-nav.tsx           # Fixed mobile navigation bar
│   ├── phone-input.tsx                 # Pakistani phone input component
│   ├── breadcrumb.tsx                  # Breadcrumb navigation trail
│   ├── shop-filters.tsx                # Category, price range, and size filter drawer/sidebar
│   ├── order-confirmation-client.tsx   # Client component handling confirmation logic
│   ├── order-email-template.tsx        # Responsive HTML email generator for orders
│   ├── faq-section.tsx                 # Accordion FAQs
│   ├── size-guide-section.tsx          # Size chart modal/drawer
│   ├── return-policy-section.tsx       # Return & exchange policies
│   └── ui/                             # 50+ Shadcn/ui and Radix UI components
├── contexts/
│   └── cart-context.tsx                # Cart state (Items, Total, Badge, LocalStorage sync)
├── hooks/
│   ├── use-mobile.tsx                  # Mobile screen breakpoint detection hook
│   └── use-toast.ts                    # Toast utilities
├── lib/
│   └── utils.ts                        # `cn()` clsx + tailwind-merge helper
├── next.config.mjs                     # Next.js build configuration
├── tailwind.config.ts                  # Tailwind v3 theme extensions & color variables
├── postcss.config.mjs                  # PostCSS plugins (tailwindcss + autoprefixer)
├── tsconfig.json                       # TypeScript compiler options
└── package.json                        # Dependencies and Bun scripts
```

---

## 7. State Management & Cart System

The cart is managed via React Context (`contexts/cart-context.tsx`) with the `useCart` hook.

### Key Cart Logic
- **Composite Unique IDs**: Each item in the cart is keyed by `${productId}-${size}`.
  - Adding the same product in the *same* size increases quantity.
  - Adding the same product in a *different* size creates a distinct cart line item.
- **LocalStorage Sync**: Cart items persist in browser `localStorage` under `"cartItems"`.
- **Custom Designed Shirts**: When customized in `/design-your-own-shirt`, the custom design is added with:
  - `productId`: `"custom-shirt"`
  - `name`: `"Custom Designed T-Shirt"`
  - `image`: Data URL or preview URL of the user's design on the selected shirt color.

---

## 8. Coding Standards & Agent Best Practices

When modifying or adding code to this project, adhere to these guidelines:

1. **Modular Components**:
   - Do **not** create large monolithic single-file pages. Break down reusable or complex sections into dedicated files under `components/`.
2. **Client Component Declarations**:
   - Always add `"use client"` at the top of any file that utilizes hooks (`useState`, `useEffect`, `useCart`), event listeners, browser APIs (`window`, `localStorage`), or third-party client libraries (`react-moveable`).
3. **Import Aliases**:
   - Always use the `@/` alias for imports (e.g., `@/components/...`, `@/lib/utils`, `@/contexts/...`).
4. **Typing & Validation**:
   - Write explicit TypeScript interfaces/types for props, payloads, and state objects.
   - For image uploads in the customizer, validate file type (`image/png`, `image/jpeg`, `image/jpg`, `image/svg+xml`) and maximum size (`<= 10MB`).
5. **UI & Polish**:
   - Use Sonner toasts (`toast.success()`, `toast.error()`) for user actions (cart updates, uploads, order completion).
   - Use skeleton loaders (`components/ui/skeleton.tsx`) during asynchronous transitions or data fetches.
   - Preserve hover animations, smooth transitions, and accessible focus states.

---

## 9. Verification & Error Checking Checklist

After making any changes:
1. **Always run a build test**:
   ```powershell
   bun run build
   ```
2. **Verify Output**:
   - Ensure `0 errors` and `0 warnings`.
   - Ensure all static and dynamic routes compile successfully.
3. **Verify CSS/Tailwind**:
   - Ensure all custom classes and CSS variables resolve cleanly without PostCSS or Turbopack syntax errors.
