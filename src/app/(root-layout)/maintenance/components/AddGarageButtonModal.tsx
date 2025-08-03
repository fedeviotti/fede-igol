'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { insertGarage } from '@/app/(root-layout)/maintenance/actions';

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

export default function AddGarageButtonModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    //console.log('Form data:', formData);
    await insertGarage({
      name: formData.name,
    });
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Aggiungi officina
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Aggiungi officina
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
