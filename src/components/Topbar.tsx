import { Box, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Image from 'next/image';

export default function Topbar() {
  return (
    <Box
      sx={{
        height: '72px',
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Image src="/eagle.png" alt="Eagle logo" width={50} height={50} priority />
        <Typography component="h1" variant="h4" sx={{ color: 'text.primary' }}>
          AIGOL
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <AccountCircleOutlinedIcon />
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          Federico Viotti
        </Typography>
      </Box>
    </Box>
  );
}
