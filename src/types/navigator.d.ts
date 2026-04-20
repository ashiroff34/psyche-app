// Web Share API Level 2 — canShare() is not yet in TypeScript's built-in lib.dom.
interface Navigator {
  canShare(data?: ShareData): boolean;
}
