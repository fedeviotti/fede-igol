'use client';

import { Box, Typography, Button } from '@mui/material';
import NextLink from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        minHeight: 0, // fondamentale per adattarsi al layout
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 500, mb: 1 }}>
        404
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        This page could not be found.
      </Typography>

      <Button variant="outlined" component={NextLink} href="/" sx={{ mt: 2 }}>
        Go back home
      </Button>
    </Box>
  );
}
