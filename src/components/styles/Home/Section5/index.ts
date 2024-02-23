'use client';
import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const StyledBox = styled(Box)(({ theme }) => ({
  paddingTop: '10rem',
  [theme.breakpoints.down('md')]: {
    paddingTop: '2rem',
  },
}));
export const StyledImage = styled(Image)(({ theme }) => ({
  animation: 'moveLeftToRight 3s linear infinite',
  '@keyframes moveLeftToRight': {
    '0%': {
      transform: 'translateX(-100px)',
    },
    '50%': {
      transform: 'translateX(50px)',
    },
    '100%': {
      transform: 'translateX(-100px)',
    },
  },
}));
