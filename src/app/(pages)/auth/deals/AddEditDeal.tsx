'use client';
import AppFileInput from '@/components/appForm/AppFileInput';
import AppSelectField from '@/components/appForm/AppSelectField';
import AppTextArea from '@/components/appForm/AppTextArea';
import AppTextField from '@/components/appForm/AppTextField';
import useToast from '@/hooks/toast/useToast';
import { DiscountOptions, ProdcutType } from '@/utils/constant';
import { DealsInitialValues } from '@/utils/schema/initialvalue';
import { DealSchema } from '@/utils/schema/schema';
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DealProducts from './DealProduct';
import { useMutation } from 'react-query';
import useAxios from '@/hooks/axios/useAxios';
import { AUTH_APIS } from '@/utils/services/apiService';

const typeWithNames: { [key: string]: string } = {
  pizza: 'product1',
  sides: 'product2',
  drinks: 'product3',
  desserts: 'product4',
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
  discount?: number;
  cb?: () => void;
};
const AddEditDeal = ({
  cb,
  isEdit,
  id,
  name,
  image,
  desc,
  discount,
}: iProps) => {
  const formProps = useForm<any>({
    mode: 'all',
    resolver: DealSchema,
    defaultValues: DealsInitialValues,
  });

  const toast = useToast();
  const { post, put } = useAxios();

  const submitForm = async (value: any) => {
    const formdata: any = new FormData();
    formdata.append('name', value.name);
    formdata.append('desc', value.desc);
    formdata.append('image', value.image);
    formdata.append('discount', value.discount);
    let productIds: string[] = [];
    //productIds
    value.types.forEach((type: any) => {
      const prodIdType: string = typeWithNames[type];
      productIds.push(value[prodIdType]);
    });
    formdata.append('productIds', productIds);

    if (isEdit) {
      const res = await put(AUTH_APIS['updateDeals'] + `/${id}`, formdata);
      return res;
    }
    const res = await post(AUTH_APIS['addDeals'], formdata);
    return res;
  };

  const mutation = useMutation(submitForm, {
    onSuccess: (data: any) => {
      toast(data.message, data.status);
      formProps.reset();
      if (cb) {
        cb();
      }
    },
    onError: (data: any) => {
      toast(data.message, data?.status);
    },
  });

  const onSubmit = async (values: any) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (isEdit) {
      formProps.setValue('name', name as string);
      formProps.setValue('desc', desc as string);
      formProps.setValue('image', image);
      formProps.setValue('discount', discount);
    }
  }, [isEdit, formProps, name, desc, image, discount]);

  const productTypes = formProps.watch('types');

  useEffect(() => {
    Object.keys(typeWithNames).forEach((element: any) => {
      formProps.setValue(element, false);
    });
    productTypes.forEach((element: any) => {
      formProps.setValue(element, true);
    });
  }, [productTypes.length]); // eslint-disable-line

  return (
    <Box>
      <FormProvider {...formProps}>
        <Box
          component={'form'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            width: '100%',
            gap: '1rem',
          }}
          onSubmit={formProps.handleSubmit(onSubmit)}
        >
          <AppTextField name='name' label='Enter Deals name' type='text' />
          <AppTextField name='rating' label='Enter rating' type='number' />
          <AppTextArea name='desc' label='Enter description' rows={5} />
          <AppFileInput name='image' label='Enter Deals Image' />
          <AppSelectField
            name='discount'
            label='Select Discount'
            options={DiscountOptions}
          />
          <AppSelectField
            name='types'
            multiple
            options={ProdcutType}
            label='Select product type'
          />
          {productTypes.map(
            (
              productType: 'pizza' | 'sides' | 'drinks' | 'desserts',
              index: number
            ) => (
              <DealProducts
                type={productType}
                name={typeWithNames[productType]}
                key={index}
              />
            )
          )}
          <Button
            variant='contained'
            color='success'
            // disabled={!formProps.formState.isValid}
            type='submit'
          >
            Submit
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};
export default AddEditDeal;
