import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "default";

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark" || value === "default";

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("default", theme === "default");
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = isTheme(stored) ? stored : "light";
    applyTheme(initial);
    setTheme(initial);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = isTheme(e.newValue) ? e.newValue : "light";
        applyTheme(newTheme);
        setTheme(newTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const changeTheme = (nextTheme: Theme) => {
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return { theme, changeTheme };
}