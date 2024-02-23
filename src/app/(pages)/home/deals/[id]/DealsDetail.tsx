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
import { useRouter } from 'next/router';

type iProducts = {
  name: string;
  desc: string;
  price: number;
  image: string;
  rating: number;
  id: string;
};

type iProps = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  backgroundImage: string;
  products: iProducts[];
};
const DealDetails = ({
  name,
  desc,
  price,
  products,
  image,
  backgroundImage,
}: iProps) => {
  const pathName = usePathname();
  return (
    <Box>
      <AppNavigator pageName='Product Details' image={backgroundImage}>
        <Link href='/home'>Home</Link> /
        <Link href={pathName}>Deals Details</Link>
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
                height='140'
                alt={name}
              />
              <CardContent>
                <Typography variant='h4' color='text.secondary'>
                  {name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ marginTop: '1rem', fontWeight: 'bold' }}
                >
                  {desc}
                </Typography>
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
                    <Typography variant='h5'>
                      {parseInt(price.toString())}
                    </Typography>
                  </FlexRowBox>
                  <Button variant='contained' color='warning'>
                    ADD TO CART
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5' textAlign='center'>
              {' '}
              This Deal contains
            </Typography>
          </Grid>
          {products.map((dealProduct) => (
            <Grid item xs={12} sm={12} md={4} key={dealProduct.id} pb={5}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component='img'
                  image={dealProduct.image}
                  alt={dealProduct.name}
                />
                <CardContent>
                  <Typography variant='h4' color='text.secondary'>
                    {dealProduct.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ marginTop: '1rem' }}
                  >
                    {dealProduct.desc}
                  </Typography>
                  <Rating
                    sx={{ marginTop: '1rem' }}
                    name='simple-controlled'
                    value={dealProduct.rating}
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
                      <Typography variant='h5'>{dealProduct.price}</Typography>
                    </FlexRowBox>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default DealDetails;
