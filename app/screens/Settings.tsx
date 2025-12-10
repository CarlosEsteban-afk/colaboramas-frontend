// Proxy route for compatibility with imports that expect `app/screens/Settings.tsx`
// The target is in `app/(main)/screens/Settings.tsx` so use a parent-relative import.
export { default } from "../(main)/screens/Settings";
