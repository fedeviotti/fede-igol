'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Modal, TextField, Typography, MenuItem } from '@mui/material';

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
  vehicleId: string;
};

export default function AddServiceButtonModal({ vehicleId }: Props) {
  // TODO: deve essere ancora implementato
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(vehicleId);
    //console.log('Form data:', formData);
    // await insertVehicle({
    //   name: formData.name,
    //   type: formData.type,
    // });
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
              label="Type"
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
