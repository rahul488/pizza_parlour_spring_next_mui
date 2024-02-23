import useAxios from '../axios/useAxios';
import { useQuery } from 'react-query';

export const useGetAPI = (url: string, queryNmae: string, params?: any) => {
  const { get } = useAxios();

  const fetchData = async () => {
    const res = await get(url, params ? { params } : {});
    return res.data;
  };

  const { data, isLoading } = useQuery([queryNmae, params], fetchData);

  return {
    data,
    isLoading,
  };
};
