'use client';

import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    // Carica la preferenza salvata dal localStorage
    const savedMode = localStorage.getItem('theme-mode') as PaletteMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Set CSS custom properties for Stack components to read
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'var(--font-roboto)',
    },
    palette: {
      mode,
      primary: {
        main: '#1b5e20', // Verde scuro personalizzato
        light: '#4caf50', // Verde medio
        dark: '#003300',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f57c00', // Arancione bruciato
        light: '#ffb74d',
        dark: '#e65100',
        contrastText: '#ffffff',
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      warning: {
        main: '#ffa726',
        light: '#ffcc80',
        dark: '#fb8c00',
        contrastText: mode === 'dark' ? '#fff' : '#000',
      },
      info: {
        main: '#29b6f6',
        light: '#81d4fa',
        dark: '#0288d1',
        contrastText: '#fff',
      },
      success: {
        main: '#66bb6a',
        light: '#98ee99',
        dark: '#388e3c',
        contrastText: '#fff',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#212121' : '#ffffff',
        secondary: mode === 'light' ? '#757575' : '#b3b3b3',
        disabled: mode === 'light' ? '#bdbdbd' : '#666666',
      },
      grey: {
        50: mode === 'light' ? '#fafafa' : '#0a0a0a',
        100: mode === 'light' ? '#f5f5f5' : '#0f0f0f',
        200: mode === 'light' ? '#eeeeee' : '#1a1a1a',
        300: mode === 'light' ? '#e0e0e0' : '#2a2a2a',
        400: mode === 'light' ? '#bdbdbd' : '#424242',
        500: mode === 'light' ? '#9e9e9e' : '#616161',
        600: mode === 'light' ? '#757575' : '#9e9e9e',
        700: mode === 'light' ? '#616161' : '#bdbdbd',
        800: mode === 'light' ? '#424242' : '#e0e0e0',
        900: mode === 'light' ? '#212121' : '#f5f5f5',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
