import { Box, Typography } from '@mui/material';
import { CategoryBox } from '../styles/common';
import { ReactNode } from 'react';

const AppNavigator = ({
  children,
  pageName,
  image,
}: {
  children: ReactNode;
  pageName: string;
  image: string;
}) => {
  return (
    <CategoryBox image={image}>
      <Box className='routes'>
        <Typography variant='h4'>{pageName}</Typography>
        <Box>{children}</Box>
      </Box>
    </CategoryBox>
  );
};
export default AppNavigator;
