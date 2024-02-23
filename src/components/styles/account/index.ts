'use client';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormBox = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '500px',
  },
  margin: '1rem 0',
  padding: '1rem 1rem',
}));
