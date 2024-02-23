'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { HeadCell } from '@/types';
import { StyledTableCell, StyledTableRow } from '../styles/common';
import {
  Box,
  Card,
  CardMedia,
  TableFooter,
  TablePagination,
  Typography,
} from '@mui/material';

const AppTable = ({
  tHeads,
  tRows,
  totalElements,
  enablePagination,
  callFilterAPI,
  actionCb,
  page,
  rowsPerPage,
}: {
  tHeads: HeadCell[];
  tRows: any;
  totalElements?: number;
  enablePagination: boolean;
  rowsPerPage?: number;
  page?: number;
  callFilterAPI: (page?: number, rowsPerPage?: number) => void;
  actionCb?: (row: any) => React.ReactNode;
}) => {
  const handPageChange = (event: unknown, newPage: number) => {
    callFilterAPI(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    callFilterAPI(0, +event.target.value);
  };

  function createImage(url: string): React.ReactNode {
    return (
      <Card sx={{ width: '100px', height: 'auto' }}>
        <CardMedia component='img' src={url} height='auto' />
      </Card>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {tHeads.map((thead) => (
              <StyledTableCell
                align={thead.numeric ? 'right' : 'left'}
                key={thead.id}
              >
                {thead.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tRows.length == 0 ? (
            <Typography variant='h5' p={3}>
              No data found
            </Typography>
          ) : (
            tRows.map((trow: any) => (
              <StyledTableRow key={trow.id}>
                {tHeads.map((thead, index) => (
                  <StyledTableCell key={index} sx={{ width: thead.width }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '0.3rem',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {thead.icon && thead.icon}
                      {thead.id === 'image'
                        ? createImage(trow[thead.id])
                        : thead.id === 'actions'
                        ? actionCb && actionCb(trow)
                        : trow[thead.id]}
                    </Box>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
      {enablePagination && tRows.length ? (
        <TableFooter sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={totalElements as number}
            rowsPerPage={rowsPerPage || 10}
            page={page || 0}
            onPageChange={handPageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      ) : null}
    </TableContainer>
  );
};
export default AppTable;
