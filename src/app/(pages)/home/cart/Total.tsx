'use client';
import { CartItemType } from '@/types';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { Box, Button, Divider, Typography } from '@mui/material';
import { memo, useMemo } from 'react';

type iProps = {
  checkout: (price: number) => void;
  selectedProducts: CartItemType[];
};

const Total = ({ checkout, selectedProducts }: iProps) => {
  const totalPrice = useMemo(() => {
    return selectedProducts.reduce(
      (acc, curProd) => acc + curProd.price * curProd.quantity,
      0
    );
  }, [selectedProducts]);
  return selectedProducts?.length ? (
    <>
      <Typography textAlign='center' variant='h5' mt={2}>
        SubTotal
      </Typography>
      <Box
        mt={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          height: '330px',
          overflow: 'auto',
        }}
      >
        {selectedProducts.map((product) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.5rem',
            }}
            key={product.id}
          >
            <Typography variant='subtitle1' flex={1}>
              {product.name}
            </Typography>
            <Typography variant='subtitle2' textAlign='center' flex={1}>
              {product.price}x{product.quantity}
            </Typography>
            <Typography
              variant='body2'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <CurrencyRupee />
              {product.price * product.quantity}{' '}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box mt={5}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
          padding: '1rem 1.5rem',
        }}
      >
        <Typography variant='body1'>Total Item Amount</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CurrencyRupee />
          <Typography>{totalPrice}</Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: 'auto', marginBottom: '1rem', padding: '0 1rem' }}>
        <Button
          color='success'
          variant='contained'
          fullWidth
          size='large'
          onClick={() => checkout(totalPrice)}
          disabled={totalPrice <= 0}
        >
          Pay Now
        </Button>
      </Box>
    </>
  ) : null;
};
export default memo(Total);
