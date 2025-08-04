'use client';
import { Box, IconButton } from '@mui/material';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import AddServiceButtonModal from '@/app/(root-layout)/maintenance/components/AddServiceButtonModal';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { ServicesDataGrid } from '@/app/(root-layout)/maintenance/components/ServicesDataGrid';

type Props = {
  params: Promise<{
    vehicleId: string;
  }>;
};

export default function VehiclePage({ params }: Props) {
  const { vehicleId } = use(params);
  const router = useRouter();
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/services?vehicleId=${vehicleId}`);
      const data = await res.json();
      setServices(data);
    }

    fetchData();
  }, [vehicleId]);

  return (
    <Box className="flex flex-col gap-4 h-full">
      <Box className="flex gap-4">
        <IconButton onClick={() => router.back()} aria-label="Torna indietro">
          <NavigateBeforeOutlinedIcon />
        </IconButton>
        <AddServiceButtonModal vehicleId={Number(vehicleId)} />
      </Box>
      <ServicesDataGrid services={services} />
    </Box>
  );
}
