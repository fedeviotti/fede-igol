'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { insertService } from '@/app/(root-layout)/maintenance/actions';
import { useGarages, useVehicles } from '@/store/store';

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
  vehicleId?: number;
  onServiceAddedAction?: () => void;
};

export default function AddServiceButtonModal({ vehicleId, onServiceAddedAction }: Props) {
  const [open, setOpen] = useState(false);
  const vehicles = useVehicles();
  const garages = useGarages();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    expiredAt: '',
    selectedVehicleId: vehicleId ? Number(vehicleId) : '',
    garageId: '',
  });

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('Form data:', formData);
    await insertService({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      expiredAt: formData.expiredAt,
      vehicleId: formData.selectedVehicleId ? Number(formData.selectedVehicleId) : 0,
      garageId: Number(formData.garageId),
    });
    onServiceAddedAction?.();
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Aggiungi servizio
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Aggiungi servizio
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleChange('name')}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              required
              fullWidth
            />
            <TextField
              select
              fullWidth
              required
              label="Seleziona veicolo"
              value={formData.selectedVehicleId}
              onChange={handleChange('selectedVehicleId')}
              disabled={!!vehicleId}
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </MenuItem>
              ))}
            </TextField>
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
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange('price')}
              required
              fullWidth
            />
            <TextField
              label="Expired At"
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
              <Button onClick={() => setOpen(false)}>Annulla</Button>
              <Button type="submit" variant="contained">
                Salva
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
