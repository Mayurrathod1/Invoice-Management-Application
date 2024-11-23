import React, { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Computer } from "lucide-react";

const ModeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const dropdownRef = useRef<any>(null);

  const handleItemClick = (selectedTheme: any) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="relative p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 text-gray-600 dark:text-gray-400" />
        <Moon className="absolute h-5 w-5 top-2 left-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 z-50">
          <div className="py-2">
            <button
              onClick={() => handleItemClick("light")}
              className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </button>
            <button
              onClick={() => handleItemClick("dark")}
              className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </button>
            <button
              onClick={() => handleItemClick("system")}
              className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Computer className="mr-2 h-4 w-4" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeToggle;
