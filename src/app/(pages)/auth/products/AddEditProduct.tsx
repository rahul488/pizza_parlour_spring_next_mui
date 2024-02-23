'use client';
import AppFileInput from '@/components/appForm/AppFileInput';
import AppSelectField from '@/components/appForm/AppSelectField';
import AppTextArea from '@/components/appForm/AppTextArea';
import AppTextField from '@/components/appForm/AppTextField';
import { ProductIntialValues } from '@/utils/schema/initialvalue';
import { productSchema } from '@/utils/schema/schema';
import { Box, Button, CardMedia } from '@mui/material';
import { Form, FormProvider, useForm } from 'react-hook-form';
import Loading from '@/app/loading';
import { useEffect } from 'react';
import { ProdcutType, queryConstant } from '@/utils/constant';
import { usePutAPI } from '@/hooks/reactQuery/usePutAPI';
import { AUTH_APIS } from '@/utils/services/apiService';
import { usePostAPI } from '@/hooks/reactQuery/usePostAPI';

type iProps = {
  id?: string;
  name?: string;
  type?: string;
  price?: number;
  rating?: number;
  desc?: string;
  image?: any;
  isEdit?: boolean;
};

const AddEditProduct = ({
  id,
  name,
  type,
  price,
  rating,
  desc,
  image,
  isEdit,
}: iProps) => {
  const formProps = useForm({
    mode: 'all',
    resolver: productSchema,
    defaultValues: ProductIntialValues,
  });
  const { mutate, isLoading } = usePostAPI(
    AUTH_APIS['addProduct'],
    queryConstant.addNewProduct,
    queryConstant.getAllProducts
  );
  const { mutate: updateProduct, isLoading: updateLoading } = usePutAPI(
    AUTH_APIS['updateProduct'],
    queryConstant.updateProduct,
    queryConstant.getAllProducts
  );
  useEffect(() => {
    if (isEdit) {
      formProps.setValue('name', name as string);
      formProps.setValue('desc', desc as string);
      formProps.setValue('price', price as number);
      formProps.setValue('rating', rating as number);
      formProps.setValue('type', type as string);
    }
  }, [isEdit, formProps, name, price, rating, type, desc]);

  const onSubmit = async (values: any) => {
    const formdata = new FormData();
    formdata.append('name', values.name);
    formdata.append('price', values.price as any);
    formdata.append('desc', values.desc);
    formdata.append('image', values.image);
    formdata.append('type', values.type);
    formdata.append('rating', values.rating as any);

    if (isEdit) {
      const data = {
        id: id as string,
        payload: formdata,
      };
      updateProduct(data);
    } else {
      mutate(formdata);
    }
  };

  return (
    <Box>
      {isLoading || updateLoading ? (
        <Loading />
      ) : (
        <FormProvider {...formProps}>
          <Form
            className='product-form'
            style={{
              display: 'flex',
              padding: '1rem 1rem',
              width: '100%',
              flexDirection: 'column',
              gap: '1rem',
            }}
            onSubmit={formProps.handleSubmit(onSubmit) as any}
          >
            <AppSelectField
              name='type'
              id='type'
              label={'Select prodct type'}
              options={ProdcutType}
              fullWidth
            />
            <AppTextField name='name' label='Enter product name' type='text' />
            <AppTextField name='price' label='Enter price' type='number' />
            <AppTextField name='rating' label='Enter rating' type='number' />
            <AppTextArea name='desc' label='Enter description' rows={5} />
            <AppFileInput name='image' label='Enter product file' />

            {isEdit && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardMedia
                  component='img'
                  src={image}
                  sx={{ width: { lg: '600px' } }}
                />
              </Box>
            )}

            <Button
              variant='contained'
              color='success'
              disabled={!formProps.formState.isValid}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        </FormProvider>
      )}
    </Box>
  );
};
export default AddEditProduct;
