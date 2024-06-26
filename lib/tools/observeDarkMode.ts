import { getGlobal } from "@nevoland/get-global";

export function observeDarkMode(callback: (isDark: boolean) => void) {
  const darkMode = getGlobal().matchMedia("(prefers-color-scheme: dark)");
  const observer = (event: MediaQueryListEvent) => callback(event.matches);
  darkMode.addEventListener("change", observer);
  callback(darkMode.matches);
  return () => darkMode.removeEventListener("change", observer);
}
