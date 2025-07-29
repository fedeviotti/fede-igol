'use client';
import { Box } from '@mui/material';
import Topbar from '@/components/Topbar';
import Sidebar, { drawerWidthClose, drawerWidthOpen } from '@/components/Sidebar';
import { ReactNode, useState } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Topbar />
      <Box className="flex grow">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box className={`flex grow pt-16`}>
          <Box className="grow p-4 h-[calc(100vh-64px)] w-[calc(100vw-240px)]">{children}</Box>
        </Box>
      </Box>
    </>
  );
}
