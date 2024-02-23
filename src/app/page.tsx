'use client';
import AppTextField from '@/components/appForm/AppTextField';
import useToast from '@/hooks/toast/useToast';
import { LoginInitialValue } from '@/utils/schema/initialvalue';
import { loginSchema } from '@/utils/schema/schema';
import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Loading from './loading';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { status, data: session } = useSession();
  if (status === 'authenticated') {
    const isAdmin = session?.user?.role.find(
      (auth) => auth.authority === 'ROLE_ADMIN'
    );
    if (isAdmin) {
      router.push('/auth');
    } else {
      router.push('/home');
    }
  }
  const formProps = useForm({
    mode: 'all',
    resolver: loginSchema,
    defaultValues: LoginInitialValue,
  });
  const onSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res: any = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      setLoading(false);
      if (res?.ok) {
        toast('Login Success', res?.ok);
      } else {
        toast('Login Error', res?.ok);
      }
    } catch (error: any) {
      setLoading(false);
      toast('Network Error', error.status);
    }
  };
  if (loading) return <Loading />;
  return (
    <FormProvider {...formProps}>
      <Box className='loginbox'>
        <Form
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '400px',
            gap: '1rem',
            position: 'relative',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            padding: '1rem 1rem',
          }}
          onSubmit={formProps.handleSubmit(onSubmit) as any}
        >
          <Typography variant='h4' textAlign='center'>
            Login Here
          </Typography>
          <AppTextField name='email' type='text' label='Enter Your email' />
          <AppTextField
            name='password'
            type='password'
            label='Enter Your password'
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
            <Link
              style={{ textDecoration: 'none', color: 'green' }}
              href='/signup'
            >
              {`Don't have account ? Signup`}
            </Link>
            <Link href='/forgot-password' style={{ color: 'red' }}>
              forgot password
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
  );
};
export default Login;
