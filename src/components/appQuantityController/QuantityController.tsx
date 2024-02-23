'use client';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { FlexRowBox } from '../styles/common';
import { useCartStore } from '@/store/store';

const QuantityContoller = ({
  total,
  product,
}: {
  total: number;
  product: any;
}) => {
  const { addToCart, decreseQuantity } = useCartStore();
  const [count, setCount] = useState(total);

  const handleCount = async (type: 'add' | 'remove') => {
    if (type === 'add') {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      setCount((prev) => prev + 1);
    } else {
      if (count == 1) return;
      await decreseQuantity(product.id, 1);
      setCount((prev) => prev - 1);
    }
  };

  return (
    <FlexRowBox justifyContent='center'>
      <AddIcon onClick={() => handleCount('add')} sx={{ cursor: 'pointer' }} />
      <Typography>{count}</Typography>
      <RemoveIcon
        onClick={() => handleCount('remove')}
        sx={{ cursor: 'pointer' }}
      />
    </FlexRowBox>
  );
};
export default QuantityContoller;
