import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexDirection: 'column',
        alignItems: 'center',
        height: '500px',
      }}
    >
      <Typography
        variant='h3'
        boxShadow='0 0 20px 5px rgba(255, 255, 255, 0.2)'
      >
        404 | Not Found
      </Typography>
      <Link href='/home' style={{ color: 'red' }}>
        Return Home
      </Link>
    </Box>
  );
}
