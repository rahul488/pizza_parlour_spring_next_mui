'use client';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import Loading from '@/app/loading';
import { useProductAddtoCartAPI } from '@/hooks/reactQuery/useProductAPI';

type iProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
};

const SingleProducts = ({ id, name, image, price, category }: iProps) => {
  const session = useSession();
  const { addToCart } = useCartStore();
  const router = useRouter();
  const { mutate, isLoading } = useProductAddtoCartAPI();

  const addtoCart = async (id: string, name: string, price: number) => {
    const payload = {
      customer_email: session.data?.user.email,
      quantity: 1,
      product_id: id,
    };
    const productDetails = {
      id: id,
      name: name,
      price: price,
      quantity: 1,
    };
    try {
      mutate(payload);
      addToCart(productDetails);
    } catch (e) {}
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid item xs={12} md={2} sm={4} key={id}>
      <Card
        elevation={10}
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          gap: '1rem',
          ':hover': {
            transform: 'scale(1.05)',
            transition: 'transform 1s ease-in-out',
          },
        }}
      >
        <CardMedia
          component='img'
          image={image}
          alt={name}
          onClick={() => router.push(`/home/product/${category}/${id}`)}
          sx={{ cursor: 'pointer' }}
        />
        <CardContent>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}
            textAlign='center'
          >
            {name}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CurrencyRupee />
            <Typography variant='h5' color='text.secondary'>
              {price}
            </Typography>
          </Box>
          <AddShoppingCartIcon onClick={() => addtoCart(id, name, price)} />
        </CardActions>
      </Card>
    </Grid>
  );
};
export default SingleProducts;
