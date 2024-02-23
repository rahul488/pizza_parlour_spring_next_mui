'use client';
import AppSelectField from '@/components/appForm/AppSelectField';
import useAxios from '@/hooks/axios/useAxios';
import { AUTH_APIS } from '@/utils/services/apiService';
import { memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const DealProducts = ({ type, name }: { type: string; name: string }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { get } = useAxios();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const fetchData = async () => {
    const res = await get(
      AUTH_APIS['getProductByCategory'] + `/${type}?page=${page}&size=${100}`
    );
    return res;
  };
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['callProdcutAPI' + type, page],
    queryFn: fetchData,
  });
  useEffect(() => {
    if (data && data?.data) {
      const optionsArr = data.data.page.content;
      const options = optionsArr.map((option: any) => ({
        label: `${option.name} - ${option.price}`,
        value: option.id,
      }));
      setOptions(options);
    }
    if (data?.data?.page?.totalPages) {
      setTotalPages(data?.data?.page?.totalPages);
    }
  }, [data]);
  const handleInfineScroll = () => {
    if (page < totalPages - 1 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <AppSelectField
      label={`Select deals from ${type}`}
      name={name}
      options={options}
      enableInfiniteScroll
      asynCb={handleInfineScroll}
    />
  );
};
export default memo(DealProducts);
