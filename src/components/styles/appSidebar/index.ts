'use client';
import { Box, ListItemButton, ListItemIcon, styled } from '@mui/material';
import Link from 'next/link';

export const StyledSidebar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
}));
export const StyledListButton = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '1rem 0.5rem',
}));
export const StyledListButtonSubMenu = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  padding: '1rem 0.5rem',
}));
export const StyledListIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
}));
