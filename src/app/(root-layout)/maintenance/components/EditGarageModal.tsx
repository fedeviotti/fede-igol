'use client';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { updateGarage } from '@/app/(root-layout)/maintenance/actions';
import { Garage } from '@/app/types';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

type Props = {
  garage: Garage | null;
  open: boolean;
  onClose: () => void;
  onGarageUpdatedAction?: () => void;
};

export const EditGarageModal: FC<Props> = ({ garage, open, onClose, onGarageUpdatedAction }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (garage) {
      setFormData({
        name: garage.name,
      });
    }
  }, [garage]);

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!garage) return;

    console.log('Edit garage form data:', formData);
    await updateGarage({
      id: garage.id,
      name: formData.name,
    });

    onGarageUpdatedAction?.();
    onClose();
  };

  if (!garage) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Modifica officina
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nome"
            value={formData.name}
            onChange={handleChange('name')}
            required
            fullWidth
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={onClose}>Annulla</Button>
            <Button type="submit" variant="contained">
              Salva modifiche
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
