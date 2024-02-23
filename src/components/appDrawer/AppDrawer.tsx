'use client';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { AppHeader, AppSidebar } from '..';
import { useAppTheme } from '@/hooks';

const AppDrawer = () => {
  const [open, setOpen] = useState(false);
  const { mode, toggleColorMode } = useAppTheme();
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ position: 'sticky', top: '0', zIndex: '999' }}>
      <AppHeader
        open={open}
        setOpen={handleOpen}
        mode={mode}
        toggleColorMode={toggleColorMode}
      />
      <AppSidebar
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        mode={mode}
        toggleColorMode={toggleColorMode}
      />
    </Box>
  );
};
export default AppDrawer;
