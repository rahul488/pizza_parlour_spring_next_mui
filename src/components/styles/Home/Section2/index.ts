'use client';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCategoryBox = styled(Box)(({ theme }) => ({
  borderRadius: '100%',
  height: '100%',
  transition: '1s ease-in-out',
  ':hover': {
    transform: 'scale(1.1)',
  },
  cursor: 'pointer',
  boxShadow: '0px 9px 30px rgba(255, 149, 5, 0.3)',
}));
export const CategoryText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginTop: '1rem',
  fontSize: '1.5rem',
}));
