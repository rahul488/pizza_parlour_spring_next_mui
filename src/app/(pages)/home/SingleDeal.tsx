'use client';
import useAxios from '@/hooks/axios/useAxios';
import useToast from '@/hooks/toast/useToast';
import { useCartStore } from '@/store/store';
import { SingleDealProps } from '@/types';
import { AUTH_APIS } from '@/utils/services/apiService';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SingleDeal = ({ deal }: { deal: SingleDealProps[] }) => {
  const navigate = useRouter();
  const { post } = useAxios();
  const session = useSession();
  const { addToCart } = useCartStore();
  const toast = useToast();
  const router = useRouter();

  const addtoCart = async (id: string, name: string, price: number) => {
    const res = await post(AUTH_APIS['addDealsToCart'], {
      customer_email: session.data?.user.email,
      quantity: 1,
      product_id: id,
    });
    if (res && res?.status) {
      addToCart({
        id: id,
        name: name,
        price: price,
        quantity: 1,
      });
      toast(res?.message, true);
    } else {
      toast(res?.message, false);
    }
  };
  return (
    <Grid container spacing={2}>
      {deal.map((dl) => (
        <Grid item xs={12} md={3} sm={6} key={dl.id}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              cursor: 'pointer',
              ':hover': {
                transform: 'scale(1.05)',
                transition: 'transform 1s ease-in-out',
              },
              justifyContent: 'space-between',
            }}
            elevation={6}
          >
            <CardMedia
              component='img'
              sx={{ width: '100%', height: '100px' }}
              image={dl.image}
              alt='Live from space album cover'
              onClick={() => navigate.push(`/home/deals/${dl.id}`)}
            />
            <CardContent>
              <Typography component='div' variant='h5'>
                {dl.name}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {dl.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CurrencyRupee />
                  <Typography variant='body1'>
                    {parseInt(dl.price.toString())}
                  </Typography>
                </Box>
                <AddShoppingCart
                  onClick={() => addtoCart(dl.id, dl.name, dl.price)}
                />
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default SingleDeal;
