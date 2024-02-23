import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const AppPagination = ({
  count = 10,
  handleChange,
}: {
  count: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) => {
  return (
    <Stack spacing={2} direction='row'>
      <Pagination count={count} onChange={handleChange} />
    </Stack>
  );
};
export default AppPagination;
