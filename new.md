As an experienced developer, you know the value of a clean, reproducible environment. This single code block contains the entire setup for a professional 2026 Next.js stack: Bun (runtime), Turbopack (bundler), Tailwind v4 (styling), Shadcn (UI components), Vitest (unit testing), and Playwright (E2E testing).
# 1. INITIALIZE PROJECT
# We use Bun's create-next-app with specific flags for the modern stack.
# Turbopack (--turbo) is default in 2026 for blazingly fast development.
bun create next-app@latest my-workshop-app --typescript --tailwind --eslint --app --turbo

# 2. ENTER PROJECT DIRECTORY
cd my-workshop-app

# 3. INITIALIZE SHADCN UI
# The CLI detects Tailwind v4 and configures the 'components/ui' structure.
# We add standard components needed for most real-world apps.
bunx --bun shadcn@latest init
bunx --bun shadcn@latest add button card input dialog tabs

# 4. INSTALL UNIT TESTING (VITEST)
# Even with Bun, we use the Vitest ecosystem for superior React/Next.js mocking.
bun add -d vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom vite-tsconfig-paths

# 5. INSTALL E2E TESTING (PLAYWRIGHT)
# This installs the runner and the necessary browser binaries (Chromium, etc.)
bunx --bun create playwright
bunx playwright install --with-deps


# 6. Install Ky for requests and SWR for the fetching state
bun add ky swr

# 7. VERIFY THE STACK
# Start dev server to see it in action
bun dev

# 8. THE STATIC EXPORT STEP (Crucial for your SPA workshop)
# Manual Step: Open next.config.ts and add: output: 'export'
# Then run the build to generate the /out folder

'''
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. The core "Static SPA" switch */
  output: 'export',

  /* 2. Crucial: Ensures folder-based routing for static hosts (e.g., /about/index.html)
     This prevents 404 errors when a user refreshes the page on a sub-route. */
  trailingSlash: true,

  /* 3. Disable built-in Image Optimization
     Since there is no Node.js server to resize images on the fly, 
     we must serve them unoptimized or use a custom loader. */
  images: {
    unoptimized: true,
  },

  /* 4. Next.js 16 optimizations (Optional but recommended) */
  reactCompiler: true, // Auto-memoization for better performance
  experimental: {
    turbopackFileSystemCache: true, // Speeds up dev reloads
  },
};

export default nextConfig;
'''



bun run build





