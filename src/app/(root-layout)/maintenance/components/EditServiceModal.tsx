'use client';

import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { updateService } from '@/app/(root-layout)/maintenance/actions';
import { Service } from '@/app/types';
import { useGarages } from '@/store/store';

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
  service: Service | null;
  open: boolean;
  onClose: () => void;
  onServiceUpdatedAction?: () => void;
};

export const EditServiceModal: FC<Props> = ({ service, open, onClose, onServiceUpdatedAction }) => {
  const garages = useGarages();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    expiredAt: '',
    executedAt: '',
    garageId: '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        price: service.price,
        expiredAt: service.expiredAt || '',
        executedAt: service.executedAt || '',
        garageId: service.garage?.id?.toString() || '',
      });
    }
  }, [service]);

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!service) return;

    console.log('Edit form data:', formData);
    await updateService({
      id: service.id,
      name: formData.name,
      price: formData.price,
      expiredAt: formData.expiredAt,
      executedAt: formData.executedAt,
      garageId: Number(formData.garageId),
    });

    onServiceUpdatedAction?.();
    onClose();
  };

  if (!service) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Modifica servizio
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
            label="Veicolo"
            value={service.vehicle?.name || 'N/A'}
            disabled
            fullWidth
            helperText="Il veicolo non può essere modificato"
          />
          <TextField
            select
            fullWidth
            required
            label="Seleziona officina"
            value={formData.garageId}
            onChange={handleChange('garageId')}
          >
            {garages.map((garage) => (
              <MenuItem key={garage.id} value={garage.id}>
                {garage.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Prezzo"
            type="number"
            value={formData.price}
            onChange={handleChange('price')}
            required
            fullWidth
          />
          <TextField
            label="Data esecuzione"
            type="date"
            value={formData.executedAt}
            onChange={handleChange('executedAt')}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
          />
          <TextField
            label="Data scadenza"
            type="date"
            value={formData.expiredAt}
            onChange={handleChange('expiredAt')}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
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
