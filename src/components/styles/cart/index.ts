'use client';
import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CartBoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  margin: '2rem 0',
}));

export const CartBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    gap: '1rem',
    flex: '1 1 60%',
  },
}));
export const ImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '1rem 0',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    gap: '1rem',
  },
}));
export const ItemBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    height: '600px',
    width: '100%',
    overflow: 'auto',
    boxShadow: '0px 9px 30px rgba(255, 149, 5, 0.5)',
  },
  overflow: 'auto',
}));
export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  // height:'200px',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'space-between',
  },
  boxShadow: '0px 9px 30px rgba(255, 149, 5, 0.8)',
}));
export const SubtotalBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flex: '1 1 40%',
    boxShadow: '0px 9px 30px rgb(181, 16, 63, 0.5)',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'end',
  },
}));
