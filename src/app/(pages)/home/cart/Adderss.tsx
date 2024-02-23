'use client';
import AppTextField from '@/components/appForm/AppTextField';
import { AddressForm } from '@/types';
import { CustomerAddresInitialValues } from '@/utils/schema/initialvalue';
import { AddressSchema } from '@/utils/schema/schema';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Form, FormProvider, useForm } from 'react-hook-form';

type iProps = {
  cb: (values: any) => void;
  next: () => void;
  address: any;
};
const AdderssForm = ({ cb, next, address = null }: iProps) => {
  const formProps = useForm<AddressForm>({
    mode: 'all',
    resolver: AddressSchema,
    defaultValues: CustomerAddresInitialValues,
  });
  const onSubmit = async (value: any) => {
    cb(value);
  };
  return (
    <Box>
      <FormProvider {...formProps}>
        <Box sx={{ width: '100%', padding: '2rem 2rem' }}>
          <Form onSubmit={formProps.handleSubmit(onSubmit) as any}>
            <Grid
              container
              component={Paper}
              p={2}
              spacing={2}
              justifyContent='center'
            >
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='receiverName'
                  type='text'
                  label='Enter Receiver Name'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='receiverEmail'
                  type='email'
                  label='Enter Receiver Email'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='state'
                  type='text'
                  label='Enter Your State Name'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='district'
                  type='text'
                  label='Enter Your District Name'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='city'
                  type='text'
                  label='Enter Your City Name'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='pinCode'
                  label='Enter Your Pincode Name'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='address'
                  type='text'
                  label='EnternYour Address Name'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='phoneNumber'
                  label='Enter Your Phone Number'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='altPhoneNumber'
                  label='Enter Alternate Phone Number'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} mb={2}>
                <Button type='submit' color='primary' variant='contained'>
                  Save
                </Button>
                <Button
                  color='success'
                  disabled={!formProps.formState.isValid || !address}
                  sx={{ marginLeft: '1rem' }}
                  variant='contained'
                  onClick={next}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </FormProvider>
    </Box>
  );
};
export default AdderssForm;
