'use client';
import AppNavigator from '@/components/appCommon/AppNavigator';
import { FlexRowBox } from '@/components/styles/common';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { usePathname } from 'next/navigation';

type iProps = {
  name: string;
  image: string;
  desc: string;
  price: number;
  rating: number;
  backgroundImage: string;
};
const ProductDetails = ({
  name,
  image,
  desc,
  price,
  rating,
  backgroundImage,
}: iProps) => {
  const pathName = usePathname();
  return (
    <Box>
      <AppNavigator pageName='Product Details' image={backgroundImage}>
        <Link href='/home'>Home</Link> /
        <Link href={pathName}>Product Details</Link>
      </AppNavigator>
      <Box sx={{ marginTop: '1rem' }}>
        <Grid
          container
          spacing={2}
          pb={4}
          direction='row'
          justifyContent='center'
          width='100%'
        >
          <Grid item xs={12} md={6} sm={6}>
            <Card>
              <CardMedia
                component='img'
                image={image}
                alt={name}
                height={200}
              />

              <CardContent>
                <Typography variant='h4' color='text.secondary'>
                  {name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ marginTop: '1rem' }}
                >
                  {desc}
                </Typography>
                <Rating
                  sx={{ marginTop: '1rem' }}
                  name='simple-controlled'
                  value={rating}
                  readOnly
                />
              </CardContent>
              <CardActionArea>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1.2rem',
                  }}
                >
                  <FlexRowBox>
                    <CurrencyRupeeIcon />
                    <Typography variant='h5'>{price}</Typography>
                  </FlexRowBox>
                  <Button variant='contained' color='warning'>
                    Buy Now
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ProductDetails;
