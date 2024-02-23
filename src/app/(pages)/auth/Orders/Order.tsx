'use client';
import AppTable from '@/components/appTable/AppTable';
import { HeadCell } from '@/types';
import { AUTH_APIS } from '@/utils/services/apiService';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppFullScreenDialog from '@/components/appDialog/AppFullScreenDialog';
import ViewOrder from '@/components/appOrder/ViewOrder';
import UpdateIcon from '@mui/icons-material/Update';
import AppDialog from '@/components/appDialog/AppDailog';
import { useGetAPI } from '@/hooks/reactQuery/useGetAPI';
import { queryConstant } from '@/utils/constant';
import { usePutAPI } from '@/hooks/reactQuery/usePutAPI';
import Loading from '@/app/loading';

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
  const [status, setStatus] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [updatedStatus, setUpdateStatus] = useState<string>('');
  const [orderId, setOrderId] = useState('');

  const { data, isLoading } = useGetAPI(
    AUTH_APIS['getAllOrder'],
    queryConstant.getAllOrders,
    { page, size: rowsPerPage }
  );
  const { mutate, isLoading: updateLoading } = usePutAPI(
    AUTH_APIS['updateOrder'],
    queryConstant.updateOrder,
    queryConstant.getAllOrders
  );

  const callFilterAPI = async (page?: number, rowsPerPage?: number) => {
    setPage(page as number);
    setRowsPerPage(rowsPerPage as number);
  };

  const handleViewOrder = (row: any) => {
    setSelectedRow(row);
    setVisibleModal(true);
  };

  const handleStatus = (row: any) => {
    setStatus(row.updatableStatus);
    setStatusModal(true);
    setUpdateStatus('');
    setOrderId(row.id);
  };

  const actionCb = (row: any) => {
    return (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <IconButton onClick={() => handleViewOrder(row)}>
          <VisibilityIcon titleAccess='View' sx={{ cursor: 'pointer' }} />
        </IconButton>
        <IconButton onClick={() => handleStatus(row)}>
          <UpdateIcon titleAccess='Update Status' sx={{ cursor: 'pointer' }} />
        </IconButton>
      </Box>
    );
  };

  function updateOrder(): void {
    const data = { id: orderId, payload: { orderStatus: updatedStatus } };
    mutate(data);
    setStatusModal(false);
  }

  if (isLoading || updateLoading) return <Loading />;

  return (
    <>
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
      <AppFullScreenDialog
        title='View Order Details'
        open={showVisibleModal}
        close={() => setVisibleModal(false)}
      >
        <ViewOrder orderDetails={selectedRow} />
      </AppFullScreenDialog>
      <AppDialog
        title='Update Order Status'
        close={() => setStatusModal(false)}
        open={statusModal}
      >
        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
          <InputLabel id='order-status'>Status</InputLabel>
          <Select
            labelId='order-status'
            id='order-status'
            value={updatedStatus}
            label='Status'
            onChange={(e) => {
              setUpdateStatus(e.target.value);
            }}
          >
            {status.map((os, i) => (
              <MenuItem key={i} value={os}>
                {os}
              </MenuItem>
            ))}
          </Select>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <Button
              disabled={!updatedStatus}
              variant='contained'
              color='success'
              onClick={updateOrder}
            >
              Update
            </Button>
          </Box>
        </FormControl>
      </AppDialog>
    </>
  );
};
export default Orders;
