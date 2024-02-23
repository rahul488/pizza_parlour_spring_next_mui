import useAxios from '../axios/useAxios';
import { useMutation } from 'react-query';
import useToast from '../toast/useToast';
import { useQueryClient } from '@/components/reactQuery/ReactQueryProvider';

export const usePostAPI = (
  url: string,
  queryName: string,
  revalidateKey?: string
) => {
  const { post } = useAxios();
  const toast = useToast();
  const queryClient = useQueryClient();

  const submitData = async (payload: any) => {
    const res = await post(url, payload);
    return res;
  };

  return useMutation([queryName], submitData, {
    onSuccess: (data) => {
      toast(data.message, data.status);
      if (revalidateKey) {
        queryClient.invalidateQueries(revalidateKey);
      }
    },
    onError: (error: { message: string }) => {
      toast(error?.message || 'Some thing went wrong', false);
      throw new Error(error?.message);
    },
  });
};
