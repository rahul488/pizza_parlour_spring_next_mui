'use client';

import AppTable from '@/components/appTable/AppTable';
import useAxios from '@/hooks/axios/useAxios';
import { HeadCell } from '@/types';
import { AUTH_APIS } from '@/utils/services/apiService';
import { Box, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AppFullScreenDialog from '@/components/appDialog/AppFullScreenDialog';
import useToast from '@/hooks/toast/useToast';
import AppConfirmationDialog from '@/components/appDialog/AppConfirmationDialog';
import { useQuery } from 'react-query';
import AddDeal from './AddEditDeal';
import { useQueryClient } from '@/components/reactQuery/ReactQueryProvider';

const headCells: HeadCell[] = [
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'discount',
    numeric: false,
    disablePadding: false,
    label: 'Discount',
  },
  {
    id: 'desc',
    numeric: false,
    width: '40%',
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];
const Product = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editData, setEditData] = useState<any>();
  const [deletedId, setDeleteId] = useState('');
  const { get, del } = useAxios();
  const toast = useToast();
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const res = await get(
      AUTH_APIS['getAllDeals'] + `?page=${page}&size=${rowsPerPage}`
    );
    return res;
  };

  const { data, refetch } = useQuery({
    queryKey: ['callDealsAPI', page, rowsPerPage],
    queryFn: fetchData,
  });

  const callFilterAPI = async (page?: number, rowsPerPage?: number) => {
    setPage(page as number);
    setRowsPerPage(rowsPerPage as number);
  };
  const callDeleteAPI = async (id: string) => {
    return await del(AUTH_APIS['deleteDeals'] + `/${id}`);
  };

  const deleteDeals = async () => {
    try {
      const res: any = await queryClient.fetchQuery(
        ['callDeleteAPI', deletedId],
        () => callDeleteAPI(deletedId)
      );
      toast(res.message, res.status);
      setDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: ['callDealsAPI'] });
    } catch (error: any) {
      toast(error?.message, error?.status);
    }
  };

  const handleEditModal = (row: any) => {
    setEditData(row);
    setEditModal(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const refetchAfterAddingDeals = () => {
    refetch();
  };

  const actionCb = (row: any) => {
    return (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <IconButton>
          <EditRoundedIcon
            titleAccess='Edit'
            sx={{ cursor: 'pointer' }}
            onClick={() => handleEditModal(row)}
          />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.id)}>
          <DeleteRoundedIcon titleAccess='Delete' sx={{ cursor: 'pointer' }} />
        </IconButton>
      </Box>
    );
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '1rem 1rem',
          }}
        >
          <Button
            variant='contained'
            color='success'
            onClick={() => setAddModal(true)}
          >
            Add Deals
          </Button>
        </Box>
        <AppTable
          tHeads={headCells}
          tRows={data?.data?.content || []}
          callFilterAPI={callFilterAPI}
          totalElements={data?.data?.totalElements}
          enablePagination
          page={page}
          rowsPerPage={data?.data?.size}
          actionCb={actionCb}
        />
      </Box>
      <AppFullScreenDialog
        title='Add Deals'
        open={addModal}
        close={() => setAddModal(false)}
      >
        <AddDeal />
      </AppFullScreenDialog>
      <AppFullScreenDialog
        title='Edit Deal'
        open={editModal}
        close={() => setEditModal(false)}
      >
        <AddDeal
          cb={refetchAfterAddingDeals}
          name={editData?.name}
          id={editData?.id}
          discount={editData?.discount}
          desc={editData?.desc}
          isEdit
          image={editData?.image}
        />
      </AppFullScreenDialog>
      <AppConfirmationDialog
        open={deleteModal}
        close={() => setDeleteModal(false)}
        title='Are you sure?'
        cb={deleteDeals}
      />
    </>
  );
};
export default Product;
