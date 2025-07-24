'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Box } from '@mui/material';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>; // niente layout
  }

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
