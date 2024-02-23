'use client';
import { FormBox } from '@/components/styles/account';
import { Box, Button, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { FlexCenter } from '@/components/styles/common';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { signupForm } from '@/types';
import { SignUpIntialValue } from '@/utils/schema/initialvalue';
import AppTextField from '@/components/appForm/AppTextField';
import { useEffect, useState } from 'react';
import { AccountSchema } from '@/utils/schema/schema';
import useAxios from '@/hooks/axios/useAxios';
import { useMutation, useQueryClient, MutationFunction } from 'react-query';
import useToast from '@/hooks/toast/useToast';
import { AUTH_APIS } from '@/utils/services/apiService';
import AppNavigator from '@/components/appCommon/AppNavigator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Account = ({ name, email }: { name: string; email: string }) => {
  const [updatePassword, setUpdatePassword] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const pathName = usePathname();
  const callUpdatePasswordAPI: MutationFunction<any, any> = async (payload: {
    name: string;
    password: string;
  }) => {
    try {
      const res = await post(AUTH_APIS['updatePassword'], payload);
      return res;
    } catch (error: any) {
      throw new Error(error?.message || 'Something went wrong!');
    }
  };
  const mutation = useMutation(['update-password'], callUpdatePasswordAPI, {
    onSuccess: (res: { status: boolean; message: string; data: any }) => {
      toast(res.message, res.status);
      setUpdatePassword(false);
      formProps.setValue('isShowPasswordField', false);
      queryClient.invalidateQueries('update-password');
    },
    onError: (data: any) => {
      toast(data?.message, false);
    },
  });
  const { post } = useAxios();
  const formProps = useForm<signupForm>({
    mode: 'all',
    resolver: AccountSchema as any,
    defaultValues: SignUpIntialValue,
  });

  useEffect(() => {
    formProps.setValue('name', name);
    formProps.setValue('email', email);
  }, [formProps, name, email]);

  const handlePassword = () => {
    setUpdatePassword(true);
    formProps.setValue('isShowPasswordField', true);
  };

  const onSubmit = async (values: any) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <>
      <AppNavigator pageName='Account Details' image='/pizza1.jpg'>
        <Link href='/home'>Home</Link> /<Link href={pathName}>Account</Link>
      </AppNavigator>
      <FlexCenter>
        <FormProvider {...formProps}>
          <Form onSubmit={formProps.handleSubmit(onSubmit) as any}>
            <FormBox>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h5' sx={{ flexGrow: '1' }}>
                  Your Details
                </Typography>
                <EditNoteIcon sx={{ cursor: 'pointer' }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  flexDirection: 'column',
                  marginTop: '1rem',
                }}
              >
                <AppTextField name='name' label='Name' disabled />
                <AppTextField name='email' label='Email' disabled />
                {updatePassword ? (
                  <>
                    <AppTextField
                      name='password'
                      label='Password'
                      type='password'
                    />
                    <AppTextField
                      name='confirmpassword'
                      type='password'
                      label='Confirm Password'
                    />
                  </>
                ) : null}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant='outlined'
                    color='success'
                    onClick={handlePassword}
                  >
                    Update password
                  </Button>
                </Box>
                {updatePassword && (
                  <Button
                    variant='contained'
                    type='submit'
                    color='warning'
                    disabled={!formProps.formState.isValid}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </FormBox>
          </Form>
        </FormProvider>
      </FlexCenter>
    </>
  );
};
export default Account;
