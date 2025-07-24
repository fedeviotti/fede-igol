'use client';
import { signOut } from 'next-auth/react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Image from 'next/image';
import { useState } from 'react';

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logica di logout
    console.log('Logout clicked');
    signOut({ callbackUrl: '/login' });
    //handleClose();
    // Potresti voler reindirizzare l'utente alla pagina di login dopo il logout
    // window.location.href = '/login';
  };

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
        <IconButton onClick={handleClick}>
          <AccountCircleOutlinedIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          Federico Viotti
        </Typography>
      </Box>
    </Box>
  );
}
