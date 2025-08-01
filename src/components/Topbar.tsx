'use client';
import { AppBar, Box, Typography, Toolbar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserButton } from '@stackframe/stack';

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
        <UserButton />
      </Toolbar>
    </AppBar>
  );
}
