'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'light', // o 'dark'
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
      contrastText: '#000',
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
      default: '#f5f5f5', // Sfondo principale
      paper: '#ffffff', // Sfondo dei componenti
    },
    text: {
      primary: '#212121', // Testo principale
      secondary: '#757575', // Testo secondario
      disabled: '#bdbdbd', // Testo disabilitato
    },
    divider: '#e0e0e0',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
});

export default theme;
