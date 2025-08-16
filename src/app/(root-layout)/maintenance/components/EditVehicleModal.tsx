'use client';

import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Vehicle } from '@/app/types';
import { updateVehicle } from '../actions';

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
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
  onVehicleUpdatedAction?: () => void;
};

export const EditVehicleModal: FC<Props> = ({ vehicle, open, onClose, onVehicleUpdatedAction }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name,
        type: vehicle.type,
      });
    }
  }, [vehicle]);

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (vehicle) {
      await updateVehicle({
        id: vehicle.id,
        name: formData.name,
        type: formData.type,
      });
      if (onVehicleUpdatedAction) {
        onVehicleUpdatedAction();
      }
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      type: '',
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Modifica veicolo
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nome"
            value={formData.name}
            onChange={handleChange('name')}
            required
            fullWidth
          />
          <TextField
            label="Tipo"
            value={formData.type}
            onChange={handleChange('type')}
            select
            required
            fullWidth
          >
            <MenuItem value="car">Macchina</MenuItem>
            <MenuItem value="motorbike">Motocicletta</MenuItem>
            <MenuItem value="bike">Bicicletta</MenuItem>
          </TextField>
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose}>Annulla</Button>
            <Button type="submit" variant="contained">
              Salva
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
