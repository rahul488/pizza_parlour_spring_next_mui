'use client';
import AppFileInput from '@/components/appForm/AppFileInput';
import AppSelectField from '@/components/appForm/AppSelectField';
import AppTextArea from '@/components/appForm/AppTextArea';
import AppTextField from '@/components/appForm/AppTextField';

import useAxios from '@/hooks/axios/useAxios';
import { BannerInitialvalues } from '@/utils/schema/initialvalue';
import { BannerSchema, productSchema } from '@/utils/schema/schema';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import {
  FieldValues,
  Form,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import useToast from '@/hooks/toast/useToast';
import { AUTH_APIS } from '@/utils/services/apiService';
import Loading from '@/app/loading';
import { BaseSyntheticEvent, useEffect } from 'react';

type fromType = {
  name: string;
  desc: string;
  image: any;
};

type iProps = {
  name?: string;
  desc?: string;
  image?: any;
  isEdit?: boolean;
  id?: string;
  cb?: () => void;
};

const AddEditBanner = ({ name, desc, image, isEdit, id, cb }: iProps) => {
  const formProps = useForm({
    mode: 'all',
    resolver: BannerSchema,
    defaultValues: BannerInitialvalues,
  });
  const queryClient = useQueryClient();
  const { post, put } = useAxios();
  const toast = useToast();
  useEffect(() => {
    if (isEdit) {
      formProps.setValue('name', name as string);
      formProps.setValue('desc', desc as string);
    }
  }, [isEdit, formProps, name, desc]);

  const submitForm = async (value: fromType) => {
    const formdata = new FormData();
    formdata.append('name', value.name);
    formdata.append('desc', value.desc);
    formdata.append('image', value.image);

    if (isEdit) {
      const res = await put(AUTH_APIS['updateBanner'] + `/${id}`, formdata);
      return res;
    }
    const res = await post(AUTH_APIS['addBanner'], formdata);
    return res;
  };

  const mutation = useMutation(submitForm, {
    onSuccess: (data: any) => {
      toast(data.message, data.status);
      queryClient.invalidateQueries('add-product');
      formProps.reset();
      if (cb) {
        cb();
      }
    },
    onError: (data: any) => {
      toast(data.message, data?.status);
    },
  });

  const onSubmit = async (values: fromType) => {
    mutation.mutate(values);
  };

  return (
    <Box>
      {mutation.isLoading ? (
        <Loading />
      ) : (
        <FormProvider {...formProps}>
          <Form
            style={{
              display: 'flex',
              padding: '1rem 1rem',
              width: '100%',
              flexDirection: 'column',
              gap: '1rem',
            }}
            onSubmit={formProps.handleSubmit(onSubmit) as any}
          >
            <AppTextField name='name' label='Enter Banner name' type='text' />
            <AppTextArea name='desc' label='Enter description' rows={5} />
            <AppFileInput name='image' label='Enter product file' />

            {isEdit && !formProps.getValues('image') && (
              <CardMedia component='img' src={image} height={200} />
            )}

            <Button variant='contained' color='success' type='submit'>
              Submit
            </Button>
          </Form>
        </FormProvider>
      )}
    </Box>
  );
};
export default AddEditBanner;
