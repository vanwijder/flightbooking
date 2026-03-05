## Course Syllabus
1. High-Level Syllabus: Next.js 15/16 Mastery
This is designed for a peer-to-peer teaching style, moving from architecture to advanced patterns.
 * Module 1: The New Mental Model
   * The "Everything is a Server Component" default.
   * Serialization boundaries: What can (and cannot) cross from Server to Client.
   * Partial Prerendering (PPR): How the static shell meets dynamic holes.
 * Module 2: Structural Design
   * Parallel Routes (Slots) and Intercepting Routes (Modals).
   * Route Groups (folder) vs. Dynamic Segments [slug].
   * Nested Layouts: State persistence and layout shifting prevention.
 * Module 3: Data Lifecycle
   * fetch() memoization and the Data Cache.
   * Server Actions: Managing mutations without useEffect.
   * Streaming & Suspense: Designing for perceived performance.
 * Module 4: The Edge & Performance
   * proxy.ts (formerly middleware): Handling auth and redirects at the edge.
   * Asset Optimization: next/image, next/font, and Script loading strategies.
   * The React Compiler: Deleting useMemo and useCallback.


## Cheat Sheet
2. Senior Developer Cheat Sheet
Essential File Conventions
 * page.tsx: Publicly accessible route.
 * layout.tsx: Shared UI; does not re-render on navigation (preserves state).
 * template.tsx: Shared UI; does re-render/re-mount on navigation.
 * loading.tsx: Instant UI fallback using React Suspense.
 * error.tsx: Client-side error boundary (must be "use client").
Directives & APIs
 * "use client": Marks the entry point for interactivity. Does not mean "render only on client," but "include this in the JS bundle."
 * "use server": Marks a function as a Server Action (callable from the client).
 * revalidatePath('/'): Purges the cache for a specific route on-demand.
 * cookies() / headers(): Read-only access to request data in Server Components.
3. The "Static SPA" Mode (Crucial Insights)
If you are using Next.js primarily for the convenience of its DX (routing, image optimization, TypeScript) but exporting it as a Static Single Page Application (via output: 'export'), the rules change significantly.
The Crucial Parts:
 * The "Out" Folder: When you set output: 'export', Next.js generates a pure HTML/CSS/JS bundle in the /out directory. You lose the Node.js server, so Server Actions and Dynamic SSR will not work.
 * The Routing Hurdle: * By default, Next.js expects a server to handle pretty URLs (e.g., /profile).
   * In a static SPA, if a user hits "Refresh" on /profile, the web server (Nginx/S3) looks for /profile.html or a folder.
   * Crucial Fix: You must configure your host (Netlify, Vercel, S3) to rewrite all requests to index.html so the client-side router can take over, OR use trailingSlash: true in next.config.js to generate folder-based structures.
 * Data Fetching: You cannot use async Server Components to fetch data at request time. You have two choices:
   * At Build Time: Use fetch in a Server Component (it runs once during next build and bakes the data into the HTML).
   * At Runtime: Use standard React useEffect or SWR/React Query inside a "use client" component to fetch from an external API.
 * No next/image Optimization: The default Image component requires a running Node.js server to resize images on the fly. For a static export, you must use a Custom Loader (like Cloudinary or Imgix) or set unoptimized: true.
