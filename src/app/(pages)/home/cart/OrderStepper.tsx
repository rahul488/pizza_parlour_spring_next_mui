'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AdderssForm from './Adderss';
import { AddressForm, CartItemType } from '@/types';
import PaymentMethod from './Payment';

const steps = ['Add Delivery Address', 'Choose Payment Method'];

type iProps = {
  selectedProducts: CartItemType[];
  totalPrice: number | 0;
  clearSelectedProduct: () => void;
  close: () => void;
};

export default function OrderStepper({
  selectedProducts,
  totalPrice,
  clearSelectedProduct,
  close,
}: iProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [payemntData, setPaymentData] = React.useState<any>(null);

  let payload = {};
  const saveAddress = (address: AddressForm) => {
    const orderedProducts: any = {};
    selectedProducts.forEach((prod: CartItemType) => {
      orderedProducts[prod.id] = prod.quantity;
    });
    payload = { orderedProducts, price: totalPrice, ...address };
    setPaymentData(payload);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        <Step key='forSaveAddress'>
          <StepLabel>Addresss</StepLabel>
        </Step>
        <Step key='forSaveAddress'>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <AdderssForm cb={saveAddress} next={handleNext} address={payemntData} />
      )}
      {activeStep === 1 && (
        <PaymentMethod
          paymentData={payemntData}
          selectedProducts={selectedProducts}
          back={handleBack}
          close={close}
          clearSelectedProduct={clearSelectedProduct}
        />
      )}
    </Box>
  );
}
