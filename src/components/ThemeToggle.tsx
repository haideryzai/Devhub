import React, { useState } from 'react';
import { Sun, Moon, Coffee, Snowflake, Droplet } from 'lucide-react';
import { useTheme, type Theme } from '../lib/theme';

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { value: 'sepia', label: 'Sepia', icon: <Coffee className="w-4 h-4" /> },
  { value: 'nord', label: 'Nord', icon: <Snowflake className="w-4 h-4" /> },
  { value: 'dracula', label: 'Dracula', icon: <Droplet className="w-4 h-4" /> },
  { value: 'system', label: 'System', icon: <Moon className="w-4 h-4" /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle Theme Menu"
      >
        {themes.find((t) => t.value === theme)?.icon}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-opacity duration-200"
          onMouseLeave={() => setIsOpen(false)}
        >
          {themes.map((t) => (
            <button
              key={t.value}
              className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === t.value ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                setTheme(t.value);
                setTimeout(() => setIsOpen(false), 100);
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}