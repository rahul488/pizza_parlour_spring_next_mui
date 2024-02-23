'use client';
import Loading from '@/app/loading';
import useAxios from '@/hooks/axios/useAxios';
import useToast from '@/hooks/toast/useToast';
import { useCartStore } from '@/store/store';
import { CartItemType } from '@/types';
import { AUTH_APIS } from '@/utils/services/apiService';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import useRazorpay from 'react-razorpay';

type iProps = {
  selectedProducts: CartItemType[];
  paymentData: any;
  back: () => void;
  clearSelectedProduct: () => void;
  close: () => void;
};
const PaymentMethod = ({
  selectedProducts,
  paymentData,
  clearSelectedProduct,
  back,
  close,
}: iProps) => {
  const { post } = useAxios();
  const { removeFromCart } = useCartStore();
  const [Razorpay] = useRazorpay();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [orderMethod, setOrderMethod] = useState<
    'ONLINE_PAYMENT' | 'CASH_ON_DELIVERY'
  >('ONLINE_PAYMENT');

  const completeOrder = async () => {
    try {
      setLoading(true);
      const res = await post(AUTH_APIS['completeOrder'], {
        ...paymentData,
        paymentMode: orderMethod,
      });
      selectedProducts.forEach((products: any) => {
        removeFromCart(products.id);
      });
      clearSelectedProduct();
      setLoading(false);
      toast(res?.message, res.status);
      close();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    if (orderMethod === 'ONLINE_PAYMENT') {
      const res = await post(AUTH_APIS['createOrder'], {
        ...paymentData,
      });
      if (res.status) {
        setLoading(false);
        const { price, orderId, appName, customerName, customerEmail } =
          res.data;
        const options = {
          key: process.env.NEXT_RAZORPAY_KEY,
          amount: price,
          currency: 'INR',
          name: appName,
          order_id: orderId,
          handler: async function (response: any) {
            completeOrder();
          },
          prefill: {
            name: customerName,
            email: customerEmail,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options as any);

        rzp1.on('payment.failed', function (response: any) {
          toast(response.error.reason, false);
        });

        rzp1.open();
      }
    } else {
      completeOrder();
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Box
      mt={2}
      sx={{
        height: '400px',
        paddingLeft: '2rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormControl>
        <FormLabel id='method-type'>Choose Your Order Method</FormLabel>
        <RadioGroup
          aria-labelledby='method-type'
          defaultValue='ONLINE_PAYMENT'
          name='method-type'
          value={orderMethod}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrderMethod(e.target.value as any)
          }
        >
          <FormControlLabel
            value='CASH_ON_DELIVERY'
            control={<Radio />}
            label='Cash On Delivery'
          />
          <FormControlLabel
            value='ONLINE_PAYMENT'
            control={<Radio />}
            label='Pay Online'
          />
        </RadioGroup>
      </FormControl>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}
      >
        {orderMethod === 'ONLINE_PAYMENT' ? (
          <Button variant='contained' color='success' onClick={handleCheckout}>
            PAY NOW
          </Button>
        ) : (
          <Button variant='contained' color='warning' onClick={handleCheckout}>
            Confirm Order
          </Button>
        )}
        <Button
          onClick={back}
          sx={{ marginLeft: '10px' }}
          variant='outlined'
          color='primary'
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentMethod;
