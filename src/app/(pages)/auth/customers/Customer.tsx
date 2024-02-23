'use client';
import Loading from '@/app/loading';
import AppTable from '@/components/appTable/AppTable';
import { useGetAPI } from '@/hooks/reactQuery/useGetAPI';
import { HeadCell } from '@/types';
import { queryConstant } from '@/utils/constant';
import { AUTH_APIS } from '@/utils/services/apiService';
import { useState } from 'react';
const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
  },
];
const Customer = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { data, isLoading } = useGetAPI(
    AUTH_APIS['getAllCustomers'],
    queryConstant.getAllCustomers,
    { page, size: rowsPerPage }
  );

  const callFilterAPI = async (page?: number, rowsPerPage?: number) => {
    setPage(page as number);
    setRowsPerPage(rowsPerPage as number);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppTable
      tHeads={headCells}
      tRows={data?.content || []}
      totalElements={data?.totalElements}
      callFilterAPI={callFilterAPI}
      rowsPerPage={data?.size}
      enablePagination
      page={page}
    />
  );
};
export default Customer;
