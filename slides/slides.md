---
theme: seriph
background: https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## Next.js in Practice
  Workshop-style course for mobile & backend developers.
drawings:
  persist: false
transition: slide-left
title: Next.js in Practice
---

# ✈️ Next.js in Practice
### Building Qoomlee Airline Online Check-in

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer hover:bg-white hover:bg-opacity-10" title="Next Page">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.prev" class="text-xl icon-btn opacity-50 !border-none hover:opacity-100" title="Previous Slide">
    <carbon:chevron-left/>
  </button>
  <button @click="$slidev.nav.next" class="text-xl icon-btn opacity-50 !border-none hover:opacity-100" title="Next Slide">
    <carbon:chevron-right/>
  </button>
</div>

---
layout: center
---

# 🎯 Who Is This Course For?

- **Mobile Developers**: iOS/Android context (UIKit, SwiftUI, Compose).
- **Backend Developers**: Go, REST, JWT, async/await knowledge.
- **Goal**: Master the modern web stack (React + Next.js) using a real project.

---
layout: section
---

# 🛠️ What We're Building

### Qoomlee Airlines — Online Check-in System

---

# 🛫 Feature Roadmap

1. **Booking Lookup**: PNR + Last Name.
2. **Dashboard**: Trip details & Passenger info.
3. **Seat selection**: Interactive seat map.
4. **Add-ons**: Baggage & extra services.
5. **Check-in Complete**: Digital boarding pass.

---

# 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Backend/API** | Go (Gin + JWT) |
| **Runtime** | Bun |
| **Deployment** | Vercel |

---
layout: section
---

# 📐 Course Structure
### 5 Workshops — ~3-4 hours each

---

# 🏗️ Workshop Breakdown

- **W1**: **Thinking in React** — Mental models & static shell.
- **W2**: **Next.js App Router** — Routing & Framework features.
- **W3**: **Auth & API** — Connecting the Go Backend.
- **W4**: **Complex UI** — The Seat Map & state machines.
- **W5**: **Polish & Deploy** — Boarding pass & shipping it live.

---
layout: center
---

# 1️⃣ Workshop 1: Thinking in React
### From Mobile/Backend to the Web

---

# 🧠 The React Mental Model

- **Mobile**: Screens & Navigation Stacks.
- **Backend**: Functions & Data Pipelines.
- **React**: **Components & State** (UI = f(data)).

<v-click>

### Key Concepts:
- **JSX**: HTML-in-JS.
- **Props**: Data passing (like function params).
- **State**: Reactivity with `useState`.
- **Composition**: Building the UI tree.

</v-click>

---

# 2️⃣ Workshop 2: Next.js App Router
### The Framework That Does More

- **File-system Routing**: App directory structure.
- **Layouts**: Persistent shells (`layout.tsx`).
- **Pages**: Route content (`page.tsx`).
- **Server vs Client Components**:
  - Server (Default): High performance, data fetching.
  - Client (`"use client"`): Interactivity, browser APIs.

---

# 3️⃣ Workshop 3: Auth & API Integration
### Connecting to the Real World

- **Go Mock API**: JWT-based authentication.
- **Data Fetching**:
  - Server Components: `async/await` fetch.
  - Client Components: `useEffect` or React Query.
- **Server Actions**: Modern form handling.
- **Middleware**: Protecting routes securely.

---

# 4️⃣ Workshop 4: Complex UI & Interactions
### The Seat Map

- **State Management**: When `useState` isn't enough -> `useReducer`.
- **Custom Hooks**: Extracting logic for reuse.
- **Context API**: Sharing state across the tree (avoiding prop drilling).
- **Optimistic UI**: Snappy updates before server confirmation.

---

# 5️⃣ Workshop 5: Boarding Pass & Deployment
### Shipping to Production

- **Confirmation Flow**: `POST /check-in/complete`.
- **Digital Boarding Pass**: 
  - QR Codes.
  - PDF Generation (`react-pdf`).
  - Print styles (`@print`).
- **Error/Loading States**: `error.tsx`, `loading.tsx`, skeletons.
- **Deployment**: Vercel + CI/CD.

---
layout: center
---

# 🚀 Let's Build Qoomlee!
### Any Questions?
