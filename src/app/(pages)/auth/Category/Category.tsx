'use client';

import AppTable from '@/components/appTable/AppTable';
import { HeadCell } from '@/types';
import { AUTH_APIS } from '@/utils/services/apiService';
import { Box, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AppFullScreenDialog from '@/components/appDialog/AppFullScreenDialog';
import AppConfirmationDialog from '@/components/appDialog/AppConfirmationDialog';
import Loading from '@/app/loading';
import AddEditCategory from './AddEditCategory';
import { useGetAPI } from '@/hooks/reactQuery/useGetAPI';
import { queryConstant } from '@/utils/constant';
import { useDeleteAPI } from '@/hooks/reactQuery/useDeleteAPI';

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
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];
const Category = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editData, setEditData] = useState<any>();
  const [deletedId, setDeleteId] = useState('');
  const { data, isLoading } = useGetAPI(
    AUTH_APIS['getCategories'],
    queryConstant.getAllCategories
  );
  const { mutate, isLoading: delteLoading } = useDeleteAPI(
    AUTH_APIS['deleteCategories'],
    queryConstant.deleteCategory,
    queryConstant.getAllCategories
  );

  const handleEditModal = (row: any) => {
    setEditData(row);
    setEditModal(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const deleteProduct = async () => {
    mutate(deletedId);
    setDeleteModal(false);
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
  if (isLoading || delteLoading) {
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
            Add Category
          </Button>
        </Box>
        <AppTable
          tHeads={headCells}
          tRows={data || []}
          callFilterAPI={() => {}}
          enablePagination={false}
          actionCb={actionCb}
        />
      </Box>
      <AppFullScreenDialog
        title='Add Category'
        open={addModal}
        close={() => setAddModal(false)}
      >
        <AddEditCategory />
      </AppFullScreenDialog>
      <AppFullScreenDialog
        title='Edit Product'
        open={editModal}
        close={() => setEditModal(false)}
      >
        <AddEditCategory
          name={editData?.name}
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
export default Category;
