'use client';
import AppTextField from '@/components/appForm/AppTextField';
import { signupForm } from '@/types';
import { SignUpIntialValue } from '@/utils/schema/initialvalue';
import { signUpSchema } from '@/utils/schema/schema';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { Form, FormProvider, useForm } from 'react-hook-form';
import Loading from '../loading';
import { usePostAPI } from '@/hooks/reactQuery/usePostAPI';
import { queryConstant } from '@/utils/constant';
import { PUBLIC_APIS } from '@/utils/services/apiService';
import useToast from '@/hooks/toast/useToast';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const { mutate, isLoading, isSuccess } = usePostAPI(
    PUBLIC_APIS['signup'],
    queryConstant.signUp
  );
  const toast = useToast();
  const router = useRouter();
  const formProps = useForm<signupForm>({
    mode: 'all',
    resolver: signUpSchema as any,
    defaultValues: SignUpIntialValue,
  });

  if (isSuccess) {
    router.push('/');
  }

  const onSubmit = async (values: signupForm) => {
    mutate(values);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      <FormProvider {...formProps}>
        <Box className='loginbox'>
          <Form
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '400px',
              gap: '0.5rem',
              position: 'relative',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              padding: '1rem 1rem',
            }}
            onSubmit={formProps.handleSubmit(onSubmit) as any}
          >
            <Typography variant='h5' textAlign='center' mb={5}>
              Create Your Account
            </Typography>

            <AppTextField name='name' type='text' label='Enter Your Name' />
            <AppTextField name='email' type='text' label='Enter Your Email' />
            <AppTextField
              name='password'
              type='password'
              label='Enter Your Password'
            />
            <AppTextField
              name='confirmpassword'
              type='password'
              label='Confirm Your Password'
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Link href='/' style={{ color: 'red' }}>
                Already have account ? Login
              </Link>
            </Box>
            <Box sx={{ width: '100%', marginTop: 'auto' }}>
              <Button
                type='submit'
                color='success'
                fullWidth
                disabled={!formProps.formState.isValid}
                variant='contained'
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Box>
      </FormProvider>
    </Box>
  );
};
export default Signup;
