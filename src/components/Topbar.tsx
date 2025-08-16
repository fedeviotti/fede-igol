'use client';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { UserButton } from '@stackframe/stack';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NotificationBell from './NotificationBell';

export default function Topbar() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/'); // Redirect to home page
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'grey.300',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          onClick={handleLogoClick}
          sx={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
        >
          <Image src="/eagle.png" alt="Eagle logo" width={50} height={50} priority />
          <Typography component="h1" variant="h4" sx={{ color: 'text.primary' }}>
            FEDE-IGOL
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationBell />
          <UserButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
