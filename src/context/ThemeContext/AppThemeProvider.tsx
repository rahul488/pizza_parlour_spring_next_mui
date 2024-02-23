'use client';
import { useSystemMode } from '@/store/store';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type IThemeProvider = {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<IThemeProvider>({
  mode: 'light',
  toggleColorMode: () => {},
});

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode, darkMode } = useSystemMode();
  useEffect(() => {
    useSystemMode.persist.rehydrate();
  }, []);
  const { toggleColorMode } = useMemo(
    () => ({
      toggleColorMode: () => {
        darkMode(mode === 'light' ? 'dark' : 'light');
      },
    }),
    [mode, darkMode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          secondary: {
            main: '#E0C2FF',
            contrastText: '#47008F',
          },
          warning: {
            main: '#fc6f03',
          },
          success: {
            main: '#32a852',
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            transition: '0.5s',
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
export default AppThemeProvider;
