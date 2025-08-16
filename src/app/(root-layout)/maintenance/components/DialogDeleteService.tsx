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
  deleteDialogOpen: boolean;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
};

export const DialogDeleteService: FC<Props> = ({
  deleteDialogOpen,
  handleDeleteCancel,
  handleDeleteConfirm,
}) => {
  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={handleDeleteCancel}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Conferma eliminazione</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Sei sicuro di voler eliminare questo servizio? Questa azione è irreversibile.
        </DialogContentText>
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
