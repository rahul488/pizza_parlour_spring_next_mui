'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const AppDialog = ({
  children,
  title,
  open,
  close,
}: {
  children: React.ReactNode;
  title: string;
  open: boolean;
  close: () => void;
}) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleDlgClose = (event: any, reason: any) => {
    if (reason && reason == 'backdropClick') {
      return;
    }
    close();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleDlgClose}
        maxWidth={'sm'}
        fullWidth
        disableEscapeKeyDown
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: '4rem' }}>
          {/* <Button onClick={close} variant="contained" color="success">Save</Button> */}
          <Button onClick={close} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default AppDialog;
