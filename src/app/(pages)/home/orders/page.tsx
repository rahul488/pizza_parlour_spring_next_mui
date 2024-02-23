'use client';
import AppTable from '@/components/appTable/AppTable';
import { HeadCell } from '@/types';
import { AUTH_APIS } from '@/utils/services/apiService';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppFullScreenDialog from '@/components/appDialog/AppFullScreenDialog';
import { useGetAPI } from '@/hooks/reactQuery/useGetAPI';
import { queryConstant } from '@/utils/constant';
import Loading from '@/app/loading';
import ViewOrder from '@/components/appOrder/ViewOrder';
import AppNavigator from '@/components/appCommon/AppNavigator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Order Id',
  },
  {
    id: 'customerEmail',
    numeric: false,
    disablePadding: false,
    label: 'Customer Email',
  },
  {
    id: 'totalPrice',
    numeric: true,
    disablePadding: false,
    icon: <CurrencyRupeeIcon />,
    label: 'Price',
  },
  {
    id: 'receiverName',
    numeric: false,
    disablePadding: false,
    label: 'Receiver Name',
  },
  {
    id: 'state',
    numeric: false,
    disablePadding: false,
    label: 'State',
  },
  {
    id: 'district',
    numeric: false,
    disablePadding: false,
    label: 'District',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'pinCode',
    numeric: false,
    disablePadding: false,
    label: 'Pincode',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: true,
    label: 'Address',
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: true,
    label: 'Phone1',
  },
  {
    id: 'altPhoneNumber',
    numeric: false,
    disablePadding: true,
    label: 'Phone2',
  },
  {
    id: 'orderStatus',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];
const Orders = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [showVisibleModal, setVisibleModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const pathName = usePathname();

  const { data, isLoading } = useGetAPI(
    AUTH_APIS['getOrders'],
    queryConstant.getUserOrder,
    { page, size: rowsPerPage }
  );

  const callFilterAPI = async (page?: number, rowsPerPage?: number) => {
    setPage(page as number);
    setRowsPerPage(rowsPerPage as number);
  };

  const handleViewOrder = (row: any) => {
    setSelectedRow(row);
    setVisibleModal(true);
  };

  const actionCb = (row: any) => {
    return (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <IconButton onClick={() => handleViewOrder(row)}>
          <VisibilityIcon titleAccess='View' sx={{ cursor: 'pointer' }} />
        </IconButton>
      </Box>
    );
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AppNavigator pageName='Product Details' image={'/order.jpg'}>
        <Link href='/home'>Home</Link> /
        <Link href={pathName}>Order Details</Link>
      </AppNavigator>
      <Box sx={{ margin: '1rem 0' }}>
        <AppTable
          tHeads={headCells}
          tRows={data?.content || []}
          callFilterAPI={callFilterAPI}
          totalElements={data?.totalElements}
          rowsPerPage={data?.size}
          page={page}
          enablePagination
          actionCb={actionCb}
        />
      </Box>
      <AppFullScreenDialog
        title='View Order Details'
        open={showVisibleModal}
        close={() => setVisibleModal(false)}
      >
        <ViewOrder orderDetails={selectedRow} />
      </AppFullScreenDialog>
    </>
  );
};
export default Orders;
