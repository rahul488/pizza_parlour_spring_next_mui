'use client';
import {
  Box,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material';
import Link from 'next/link';

type ICategoryBoxProps = {
  image?: String;
};

export const StyledIcon = styled(IconButton)(({ theme }) => ({
  background: theme.palette.warning.main,
}));
export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));
export const FlexSpaceBetweenBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'center',
}));
export const FlexColumnBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
export const FlexRowBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  alignItems: 'center',
  height: '100%',
}));

export const FlexCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}));

export const CategoryBox = styled(Box)<ICategoryBoxProps>(
  ({ theme, image }) => ({
    position: 'relative',
    ':before': {
      position: 'absolute',
      background: `url(${image})`,
      content: '""',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      opacity: '0.5',
      height: '400px',
      width: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
    '.routes': {
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      a: {
        color: theme.palette.text.primary,
      },
    },
  })
);

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
