'use client';
import AppFileInput from '@/components/appForm/AppFileInput';
import AppSelectField from '@/components/appForm/AppSelectField';
import AppTextField from '@/components/appForm/AppTextField';

import { CategoryInitialValues } from '@/utils/schema/initialvalue';
import { CategorySchema } from '@/utils/schema/schema';
import { Box, Button, CardMedia } from '@mui/material';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { AUTH_APIS } from '@/utils/services/apiService';
import Loading from '@/app/loading';
import { useEffect } from 'react';
import { ProdcutType, queryConstant } from '@/utils/constant';
import { usePostAPI } from '@/hooks/reactQuery/usePostAPI';

type fromType = {
  name: string;
  type: string;
  price: number;
  rating: number;
  desc: string;
  image: any;
};

type iProps = {
  id?: string;
  name?: string;
  type?: string;
  price?: number;
  rating?: number;
  desc?: string;
  image?: any;
  isEdit?: boolean;
  cb?: () => void;
};

const AddEditCategory = ({ id, name, type, image, isEdit, cb }: iProps) => {
  const formProps = useForm({
    mode: 'all',
    resolver: CategorySchema,
    defaultValues: CategoryInitialValues,
  });

  const { mutate: addCategory, isLoading: addCategoryLoading } = usePostAPI(
    AUTH_APIS['addCateGories'],
    queryConstant.addCategory,
    queryConstant.getAllCategories
  );
  const { mutate: updateCategory, isLoading: updateCategoryLoading } =
    usePostAPI(
      AUTH_APIS['updateCategories'],
      queryConstant.updateCategory,
      queryConstant.getAllCategories
    );

  const imageChanged = formProps.watch('image');
  useEffect(() => {
    if (isEdit) {
      formProps.setValue('name', name as string);
      formProps.setValue('type', type as string);
    }
  }, [isEdit, formProps, name, type]);

  const onSubmit = async (values: any) => {
    const formdata = new FormData();
    formdata.append('name', values.name);
    formdata.append('image', values.image);
    formdata.append('type', values.type);
    if (isEdit) {
      const data = {
        id: id as string,
        payload: formdata,
      };
      updateCategory(data);
    } else {
      addCategory(formdata);
    }
  };

  return (
    <Box>
      {addCategoryLoading || updateCategoryLoading ? (
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
              label={'Select Category Type'}
              options={ProdcutType}
              fullWidth
            />
            <AppTextField name='name' label='Enter Category name' type='text' />
            <AppFileInput name='image' label='Enter Category file' />

            {isEdit && !imageChanged && (
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
export default AddEditCategory;
