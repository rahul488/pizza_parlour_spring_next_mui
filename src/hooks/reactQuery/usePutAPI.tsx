import useAxios from '../axios/useAxios';
import { useMutation } from 'react-query';
import useToast from '../toast/useToast';
import { useQueryClient } from '@/components/reactQuery/ReactQueryProvider';

export const usePutAPI = (
  url: string,
  queryName: string,
  revalidateKey?: string
) => {
  const { put } = useAxios();
  const toast = useToast();
  const queryClient = useQueryClient();

  const submitData = async ({ id, payload }: { id: string; payload: any }) => {
    const res = await put(url + `/${id}`, payload);
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
