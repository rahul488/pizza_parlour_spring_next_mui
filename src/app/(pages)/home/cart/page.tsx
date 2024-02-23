'use client';
import { FlexRowBox } from '@/components/styles/common';
import { CardActions, CardContent, CardMedia, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  CartBox,
  CartBoxWrapper,
  ItemBox,
  StyledCard,
  SubtotalBox,
} from '@/components/styles/cart';
import { QuantityContoller } from '@/components';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartStore } from '@/store/store';
import useAxios from '@/hooks/axios/useAxios';
import useToast from '@/hooks/toast/useToast';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import {
  AUTH_APIS,
  PUBLIC_IMAGE_PRODUCT_DEALS,
} from '@/utils/services/apiService';
import Total from './Total';
import AppNavigator from '@/components/appCommon/AppNavigator';
import { usePathname } from 'next/navigation';
import AppFullScreenDialog from '@/components/appDialog/AppFullScreenDialog';
import OrderStepper from './OrderStepper';
import { CartItemType } from '@/types';

const Cart = () => {
  const { products, removeFromCart } = useCartStore();
  const [openOrderDialog, setOrderDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] =
    useState<CartItemType[]>(products);
  const [totalPrice, setPrice] = useState<number>(0);
  const { del, post } = useAxios();
  const toast = useToast();
  const queryClient = useQueryClient();
  const currentPath = usePathname();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckboxChange = (product: CartItemType) => {
    setSelectedProducts((prevSelectedProducts: any) => {
      if (
        prevSelectedProducts.find(
          (prod: CartItemType) => prod.id === product.id
        )
      ) {
        return prevSelectedProducts.filter(
          (currProd: CartItemType) => currProd.id !== product.id
        );
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleDelete: MutationFunction<any, any> = async (id: string) => {
    try {
      const res = await del(AUTH_APIS['deleteProductFromCart'] + `/${id}`, {});
      removeFromCart(id);
      setSelectedProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
      return res;
    } catch (error) {
      throw new Error('Unable to delete');
    }
  };
  const mutation = useMutation(['deleteItem'], handleDelete, {
    onSuccess: (data) => {
      toast(data.message, data?.status);
      queryClient.invalidateQueries('deleteItem');
    },
    onError: (data: any) => {
      toast(data.message, false);
    },
  });

  const removeProduct = (id: string) => {
    mutation.mutate(id);
  };
  const checkout = (totalPrice: number) => {
    setPrice(totalPrice);
    setOrderDialog(true);
  };

  return mutation.isLoading ? (
    <Loading />
  ) : (
    <>
      <AppNavigator pageName='Cart' image='/pizza1.jpg'>
        <>
          <Link href='/home'>Home</Link> / <Link href={currentPath}>Cart</Link>
        </>
      </AppNavigator>
      <CartBoxWrapper>
        <CartBox>
          <ItemBox>
            {products.length == 0 ? (
              <FlexRowBox sx={{ justifyContent: 'center' }}>
                <Typography variant='h5' color='orangered'>
                  {`  You don't have any product in your cart.`}
                </Typography>
              </FlexRowBox>
            ) : (
              products.map((product, i) => (
                <StyledCard key={product.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        color='default'
                        checked={selectedProducts.some(
                          (prod) => prod.id === product.id
                        )}
                        onChange={() => handleCheckboxChange(product)}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <CardMedia
                        component='img'
                        height={145}
                        sx={{ width: 151, cursor: 'pointer' }}
                        image={PUBLIC_IMAGE_PRODUCT_DEALS + product.id}
                        alt={product.name}
                      />
                      <QuantityContoller
                        total={product.quantity}
                        product={product}
                      />
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant='h5'>{product.name}</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <CurrencyRupeeIcon />
                      <Typography variant='body2'>{product.price}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions onClick={() => removeProduct(product.id)}>
                    <DeleteIcon color='warning' sx={{ cursor: 'pointer' }} />
                  </CardActions>
                </StyledCard>
              ))
            )}
          </ItemBox>
        </CartBox>
        <SubtotalBox className='subtotal'>
          <Total checkout={checkout} selectedProducts={selectedProducts} />
        </SubtotalBox>
      </CartBoxWrapper>
      <AppFullScreenDialog
        title='Complete Your Order'
        open={openOrderDialog}
        close={() => setOrderDialog(false)}
      >
        <OrderStepper
          selectedProducts={selectedProducts}
          totalPrice={totalPrice}
          close={() => setOrderDialog(false)}
          clearSelectedProduct={() => setSelectedProducts([])}
        />
      </AppFullScreenDialog>
    </>
  );
};
export default Cart;
