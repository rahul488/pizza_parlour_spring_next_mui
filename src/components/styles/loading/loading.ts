'use client';
import { Box, styled } from '@mui/material';

export const LoadingBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
export const ImageBox = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/p.gif")',
  height: '200px',
  width: '200px',
}));
