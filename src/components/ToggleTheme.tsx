import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div>
      <Button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-pressed={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
        type="button"
        variant="ghost"
      >
        {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        <span className="sr-only">
          Switch to {isDark ? "light" : "dark"} mode
        </span>
      </Button>
    </div>
  );
}

export default ToggleTheme;
