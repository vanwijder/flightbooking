import { Window } from "happy-dom";

const win = new Window({ url: "http://localhost:3000" }) as any;

// Set critical DOM globals
(globalThis as any).window = win;
(globalThis as any).document = win.document;
(globalThis as any).navigator = win.navigator;
(globalThis as any).location = win.location;
(globalThis as any).history = win.history;
(globalThis as any).getComputedStyle = win.getComputedStyle.bind(win);
(globalThis as any).requestAnimationFrame =
  win.requestAnimationFrame?.bind(win) ?? ((cb: any) => setTimeout(cb, 0));
(globalThis as any).cancelAnimationFrame =
  win.cancelAnimationFrame?.bind(win) ?? clearTimeout;

// Copy DOM classes and remaining window props to globalThis
const windowProps = Object.getOwnPropertyNames(win);
for (const prop of windowProps) {
  if (prop === "undefined" || prop === "NaN" || prop === "Infinity") continue;
  if (prop in globalThis) continue;
  try {
    (globalThis as any)[prop] = win[prop];
  } catch {
    // skip read-only
  }
}
