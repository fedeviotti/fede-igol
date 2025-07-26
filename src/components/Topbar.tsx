'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserButton } from '@stackframe/stack';

export default function Topbar() {
  const router = useRouter();

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
      <UserButton />
    </Box>
  );
}
