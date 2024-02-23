'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledIconBoxWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
export const StyledLinkBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  margin: 'auto',
}));
export const MobileMenu = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'inline-block',
  },
  marginLeft: 'auto',
}));
