'use client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  CategoryBox,
  FlexCenter,
  FlexRowBox,
  FlexSpaceBetweenBox,
} from '@/components/styles/common';
import Link from 'next/link';
import Image from 'next/image';
import { AppPagination } from '@/components';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
const WishList = () => {
  return (
    <>
      <CategoryBox>
        <Box className='routes'>
          <Typography variant='h4'>Wishlist</Typography>
          <Box>
            <Link href='/home'>Home</Link>/
            <Link href='/home/wishlist'>WishList</Link>
          </Box>
        </Box>
      </CategoryBox>
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant='h5' textAlign='center'>
          Your Favorites are here
        </Typography>
        <Box>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card>
                  <CardMedia>
                    <Box sx={{ position: 'relative' }}>
                      <Image
                        src='https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/ultimate-tandoori-veggie.059dfd9b3f088818ed725872d98d20b6.1.jpg'
                        width={600}
                        height={300}
                        alt=''
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 10,
                          top: 0,
                          borderRadius: '100%',
                          height: '40px',
                          width: '40px',
                          bgcolor: 'background.default',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FavoriteIcon
                          fontSize='medium'
                          color='success'
                          sx={{ cursor: 'pointer' }}
                        />
                      </Box>
                    </Box>
                  </CardMedia>
                  <CardContent>
                    <FlexSpaceBetweenBox>
                      <Typography gutterBottom variant='h5' component='div'>
                        Pizza
                      </Typography>
                      <FlexRowBox>
                        <CurrencyRupeeIcon />
                        <Typography variant='h6' color='text.default'>
                          99
                        </Typography>
                      </FlexRowBox>
                    </FlexSpaceBetweenBox>
                  </CardContent>
                  <CardActions>
                    <FlexCenter sx={{ gap: '1rem' }}>
                      <Tooltip title='Move to cart'>
                        <ShoppingCartCheckoutIcon
                          sx={{ cursor: 'pointer' }}
                          titleAccess='Move to cart'
                          fontSize='large'
                        />
                      </Tooltip>

                      <Tooltip title='Remove from wishlist'>
                        <ExitToAppIcon
                          sx={{ cursor: 'pointer' }}
                          fontSize='large'
                        />
                      </Tooltip>
                    </FlexCenter>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <FlexCenter>{/* <AppPagination count={10} /> */}</FlexCenter>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default WishList;
