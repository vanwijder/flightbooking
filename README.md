# Hello NextJS

## pre-requisites

- **Understanding of TypeScript** (types, interfaces, generics, enums)
  - [TypeScript Official Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
  - [TypeScript Playground](https://www.typescriptlang.org/play) — great for quick experiments

- **Experience with at least one programming language** (Go, Swift, Kotlin — you're covered)

- **Comfortable with the terminal / command line**
  - [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/2020/course-shell/) — MIT's free shell basics course
  - Mac/Linux users are mostly fine, Windows users should set up [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)

- **Git basics** (clone, commit, push)
  - [Git Official Getting Started](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
  - [Learn Git Branching](https://learngitbranching.js.org/) — interactive and visual

- **Bun installed on your machine**
  - [Bun Installation Guide](https://bun.com/docs/installation) — one command install
  - Verify with `bun --version` in your terminal

---

**Good to have but not required:**

- **Basic understanding of how the web works** (HTTP, request/response, REST APIs)
  - [MDN — How the Web Works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
  - [HTTP Crash Course — Fireship](https://www.youtube.com/watch?v=iYM2zFP3Zn0) — 7 min video, straight to the point

- **Some exposure to HTML and CSS**
  - [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)
  - [MDN CSS Basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)
  - You don't need to be good at it — just not completely new to tags and selectors


## Create a new Next.js app

```bash
bun create next-app@latest my-app --yes
```


## Create a new React app

```bash
bun create react@latest my-app --yes

# more configuration with vite
bun create vite@latest my-app
```