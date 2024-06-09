import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextProps {
  themeMode: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  value: ThemeContextProps;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  value,
  children,
}) => {
  const { themeMode, toggleTheme } = value;

  const [currentThemeMode, setCurrentThemeMode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme || "light"; // Set the default theme to "light"
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      currentThemeMode === "dark"
    );
    document.documentElement.classList.toggle(
      "light",
      currentThemeMode === "light"
    );
  }, [currentThemeMode]);

  const handleToggleTheme = () => {
    const newThemeMode = currentThemeMode === "light" ? "dark" : "light";
    setCurrentThemeMode(newThemeMode);
    localStorage.setItem("theme", newThemeMode);
  };

  const contextValue: ThemeContextProps = {
    themeMode: currentThemeMode,
    toggleTheme: handleToggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
