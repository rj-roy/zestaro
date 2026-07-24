"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-11 h-11 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 transition-all duration-300 hover:scale-105"
    >
      {isDark ? (
        <Moon className="size-5 text-cyan-400" />
      ) : (
        <Sun className="size-5 text-yellow-500" />
      )}
    </button>
  );
}