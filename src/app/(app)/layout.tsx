import { Box } from '@mui/material';
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <Box sx={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar />
        <Box sx={{ flex: 1, padding: '1.5rem' }}>
          <main>{children}</main>
        </Box>
      </Box>
    </>
  );
}
