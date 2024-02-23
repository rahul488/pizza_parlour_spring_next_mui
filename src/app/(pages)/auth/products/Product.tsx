'use client';

import AppTable from '@/components/appTable/AppTable';
import { HeadCell } from '@/types';
import { Box, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AppFullScreenDialog from '@/components/appDialog/AppFullScreenDialog';
import AddProduct from './AddEditProduct';
import AppConfirmationDialog from '@/components/appDialog/AppConfirmationDialog';
import Loading from '@/app/loading';
import { useGetAPI } from '@/hooks/reactQuery/useGetAPI';
import { queryConstant } from '@/utils/constant';
import { AUTH_APIS } from '@/utils/services/apiService';
import { useDeleteAPI } from '@/hooks/reactQuery/useDeleteAPI';

const headCells: HeadCell[] = [
  {
    id: 'image',
    numeric: false,
    width: '10%',
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    width: '10%',
    label: 'Name',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    width: '10%',
    label: 'Price',
  },
  {
    id: 'desc',
    numeric: false,
    width: '20%',
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'rating',
    numeric: false,
    disablePadding: false,
    width: '10%',
    label: 'Rating',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    width: '10%',
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

  const { data, isLoading } = useGetAPI(
    AUTH_APIS['getAllProducts'],
    queryConstant.getAllProducts,
    { page, size: rowsPerPage }
  );
  const { isLoading: deleteLoading, mutate } = useDeleteAPI(
    AUTH_APIS['deleteProduct'],
    queryConstant.deleteProduct,
    queryConstant.getAllProducts
  );

  const callFilterAPI = async (page?: number, rowsPerPage?: number) => {
    setPage(page as number);
    setRowsPerPage(rowsPerPage as number);
  };

  const handleEditModal = (row: any) => {
    setEditData(row);
    setEditModal(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const deleteProduct = async () => {
    setDeleteModal(false);
    try {
      mutate(deletedId);
    } catch (error: any) {}
  };

  const actionCb = (row: any) => {
    return (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <IconButton onClick={() => handleEditModal(row)}>
          <EditRoundedIcon titleAccess='Edit' sx={{ cursor: 'pointer' }} />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.id)}>
          <DeleteRoundedIcon titleAccess='Delete' sx={{ cursor: 'pointer' }} />
        </IconButton>
      </Box>
    );
  };
  if (isLoading || deleteLoading) {
    return <Loading />;
  }

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
            Add Product
          </Button>
        </Box>
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
        title='Add Product'
        open={addModal}
        close={() => setAddModal(false)}
      >
        <AddProduct />
      </AppFullScreenDialog>
      <AppFullScreenDialog
        title='Edit Product'
        open={editModal}
        close={() => setEditModal(false)}
      >
        <AddProduct
          name={editData?.name}
          desc={editData?.desc}
          price={editData?.price}
          rating={editData?.rating}
          image={editData?.image}
          type={editData?.type}
          id={editData?.id}
          isEdit={true}
        />
      </AppFullScreenDialog>
      <AppConfirmationDialog
        open={deleteModal}
        close={() => setDeleteModal(false)}
        title='Are you sure?'
        cb={deleteProduct}
      />
    </>
  );
};
export default Product;
