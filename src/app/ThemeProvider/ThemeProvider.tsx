"use client";
import React, { createContext, useEffect, useState, useContext } from "react";

type Theme = "light" | "dark" | "auto";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: Theme) => {
    if (theme === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    setThemeState(theme);
    localStorage.setItem("theme", theme);
  };

  const setTheme = (theme: Theme) => {
    applyTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
