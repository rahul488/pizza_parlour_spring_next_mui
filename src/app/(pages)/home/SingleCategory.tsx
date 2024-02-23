'use client';

import { Card, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';

type iProps = {
  name: string;
  src: string;
};

const SingleCategory = ({ src, name }: iProps) => {
  const navigate = useRouter();
  return (
    <Card
      elevation={10}
      sx={{
        ':hover': {
          transform: 'scale(1.05)',
          transition: 'transform 1s ease-in-out',
        },
      }}
    >
      <CardMedia
        component='img'
        image={src}
        alt={name}
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate.push(`/home/product/${name}`)}
      ></CardMedia>
    </Card>
  );
};
export default SingleCategory;
