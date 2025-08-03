'use client';
import { Box, IconButton } from '@mui/material';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import AddServiceButtonModal from '@/app/(root-layout)/maintenance/components/AddServiceButtonModal';
import { useRouter } from 'next/navigation';
import { use } from 'react';

type Props = {
  params: Promise<{
    vehicleId: string;
  }>;
};

export default function VehiclePage({ params }: Props) {
  const { vehicleId } = use(params);
  const router = useRouter();

  return (
    <Box className="flex flex-col gap-4 h-full">
      <Box className="flex gap-4">
        <IconButton onClick={() => router.back()} aria-label="Torna indietro">
          <NavigateBeforeOutlinedIcon />
        </IconButton>
        <AddServiceButtonModal vehicleId={vehicleId} />
      </Box>
      <span>Tabella servizi</span>
    </Box>
  );
}
