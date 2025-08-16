import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC } from 'react';

type Props = {
  open: boolean;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
  dialogContextText: string;
};

export const DialogDelete: FC<Props> = ({
  open,
  handleDeleteCancel,
  handleDeleteConfirm,
  dialogContextText,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleDeleteCancel}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Conferma eliminazione</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">{dialogContextText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCancel} color="primary">
          Annulla
        </Button>
        <Button onClick={handleDeleteConfirm} color="error" variant="contained">
          Elimina
        </Button>
      </DialogActions>
    </Dialog>
  );
};
