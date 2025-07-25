'use client';
import { signOut } from 'next-auth/react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Image from 'next/image';
import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleLogoClick = () => {
    router.push('/'); // Redirect to home page
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
      <Box
        onClick={handleLogoClick}
        sx={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
      >
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
          <MenuItem onClick={handleProfileClick}>Profilo</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Esci</MenuItem>
          <MenuItem onClick={handleRegisterClick}>Registrati</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
