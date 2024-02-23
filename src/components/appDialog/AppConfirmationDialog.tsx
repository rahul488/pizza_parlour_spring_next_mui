import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

type iProps = {
  open: boolean;
  close: () => void;
  title: string;
  cb: () => void;
};

export default function AppConfirmationDialog({
  open,
  close,
  title,
  cb,
}: iProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cb} variant='contained' color='warning'>
            Yes
          </Button>
          <Button onClick={close} color='success' autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
