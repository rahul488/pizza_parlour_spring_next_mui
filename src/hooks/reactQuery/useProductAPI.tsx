import { AUTH_APIS } from '@/utils/services/apiService';
import useAxios from '../axios/useAxios';
import useToast from '../toast/useToast';
import { useMutation, useQuery } from 'react-query';
import { queryConstant } from '@/utils/constant';

export const useProductAddtoCartAPI = () => {
  const { post } = useAxios();
  const toast = useToast();

  const submitData = async (payload: any) => {
    const res = await post(AUTH_APIS['addToCart'], payload);
    return res;
  };

  return useMutation([queryConstant.addTocart], submitData, {
    onSuccess: (data) => {
      toast(data.message, data.status);
    },
    onError: (error: { message: string }) => {
      toast(error?.message || 'Some thing went wrong', false);
      throw new Error(error?.message);
    },
  });
};
