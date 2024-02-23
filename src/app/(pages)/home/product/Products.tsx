'use client';
import { FlexCenter, FlexRowBox } from '@/components/styles/common';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AppPagination } from '@/components';
import { useEffect, useState } from 'react';
import useAxios from '@/hooks/axios/useAxios';
import { AUTH_APIS } from '@/utils/services/apiService';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/store';
import { useSession } from 'next-auth/react';
import useToast from '@/hooks/toast/useToast';

type iProps = {
  productArr: any;
  categroy: string;
};
const Products = ({ productArr, categroy }: iProps) => {
  const [currProductArr, setProductArr] = useState(productArr || null);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { get, post } = useAxios();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const session = useSession();
  const toast = useToast();

  useEffect(() => {
    const getProduct = async () => {
      const res = await get(
        AUTH_APIS['getProductByCategory'] +
          `/${categroy}?page=${page - 1}&size=10`
      );
      if (res?.status) {
        setProductArr(res?.data.page);
      }
    };
    if (page != 0) {
      getProduct();
    }
  }, [page, categroy]); // eslint-disable-line

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const addtoCart = async (product: any) => {
    const res = await post(AUTH_APIS['addToCart'], {
      customer_email: session.data?.user.email,
      quantity: 1,
      product_id: product.id,
    });
    if (res && res?.status) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      toast(res?.message, true);
    } else {
      toast(res?.message, false);
    }
  };

  return (
    <Grid container spacing={2}>
      {currProductArr &&
        currProductArr.content.map((product: any) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              sx={{
                ':hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 1s ease-in-out',
                },
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component='img'
                  image={product.image}
                  alt={product.name}
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    router.push(`/home/product/${categroy}/${product.id}`)
                  }
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
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {product.name}
                </Typography>
                <FlexRowBox>
                  <CurrencyRupeeIcon />
                  <Typography variant='h6' color='text.default'>
                    {product.price}
                  </Typography>
                </FlexRowBox>
              </CardContent>
              <CardActions>
                <FlexCenter>
                  <AddShoppingCartIcon
                    color='warning'
                    fontSize={'large'}
                    onClick={() => addtoCart(product)}
                    sx={{ cursor: 'pointer' }}
                  />
                </FlexCenter>
              </CardActions>
            </Card>
          </Grid>
        ))}
      {currProductArr ? (
        <Grid item xs={12}>
          <FlexCenter>
            <AppPagination
              count={currProductArr.totalPages}
              handleChange={handleChange}
            />
          </FlexCenter>
        </Grid>
      ) : null}
    </Grid>
  );
};
export default Products;
