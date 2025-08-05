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
  const [services, setServices] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/services?vehicleId=${vehicleId}`);
    const data = await res.json();
    setServices(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!services) {
      fetchData();
    }
  }, [fetchData, services, vehicleId]);

  return (
    <Box className="vehicle-page-data-grid-height flex flex-col gap-4">
      <Box className="flex gap-4">
        <IconButton onClick={() => router.back()} aria-label="Torna indietro">
          <NavigateBeforeOutlinedIcon />
        </IconButton>
        <AddServiceButtonModal vehicleId={Number(vehicleId)} onServiceAddedAction={fetchData} />
      </Box>
      <ServicesDataGrid services={services} isLoading={isLoading} />
    </Box>
  );
}
