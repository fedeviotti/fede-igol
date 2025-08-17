import { Chip } from '@mui/material';

export const getStatusChip = (status: 'expired' | 'expiringSoon' | 'valid') => {
  console.log('status', status);
  switch (status) {
    case 'expired':
      return <Chip label="Scaduto" color="error" variant="outlined" />;
    case 'expiringSoon':
      return <Chip label="In scadenza" color="warning" variant="outlined" />;
    case 'valid':
      return <Chip label="Attivo" color="success" variant="outlined" />;
  }
};
