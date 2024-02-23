import useAxios from '../axios/useAxios';
import { useQueryClient } from '@/components/reactQuery/ReactQueryProvider';
import { useMutation } from 'react-query';
import useToast from '../toast/useToast';

export const useDeleteAPI = (
  url: string,
  queryName: string,
  revalidateKey?: string
) => {
  const { del } = useAxios();
  const toast = useToast();
  const queryClient = useQueryClient();

  const submitData = async (id: string) => {
    const res: any = del(url + `/${id}`);
    return res;
  };

  return useMutation(queryName, submitData, {
    onSuccess: (data) => {
      toast(data.message, data.status);
      if (revalidateKey) {
        queryClient.invalidateQueries(revalidateKey);
      }
    },
    onError: (error: { message: string }) => {
      toast(error?.message || 'Some thing went wrong', false);
    },
  });
};
