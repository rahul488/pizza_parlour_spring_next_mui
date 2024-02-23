'use client';

import { IThemeProvider, ThemeContext } from '@/context';
import { useContext } from 'react';

const useAppTheme = () => {
  const { mode, toggleColorMode } = useContext<IThemeProvider>(ThemeContext);

  return { mode, toggleColorMode };
};
export default useAppTheme;
