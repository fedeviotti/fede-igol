'use client';

import { AddServiceButtonModal } from '@components/AddServiceButtonModal';
import { ServicesDataGrid } from '@components/ServicesDataGrid';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useState } from 'react';

type Props = {
  params: Promise<{
    vehicleId: string;
  }>;
};

export default function VehiclePage({ params }: Props) {
  const { vehicleId } = use(params);
  const router = useRouter();
  const [services, setServices] = useState();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/services?vehicleId=${vehicleId}`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento del veicolo');
    } finally {
      setIsLoading(false);
    }
  }, [vehicleId]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (error) {
    return (
      <Box className="flex flex-col gap-4">
        <Box className="flex gap-4 items-center">
          <IconButton onClick={() => router.back()} aria-label="Torna indietro">
            <NavigateBeforeOutlinedIcon />
          </IconButton>
          <Typography variant="h5">Dettaglio Veicolo</Typography>
        </Box>
        <Card>
          <CardContent>
            <Typography color="error">{error}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="vehicle-page-data-grid-height flex flex-col gap-4">
      <Box className="flex gap-4">
        <IconButton onClick={() => router.back()} aria-label="Torna indietro">
          <NavigateBeforeOutlinedIcon />
        </IconButton>
        <AddServiceButtonModal vehicleId={Number(vehicleId)} onServiceAddedAction={fetchServices} />
      </Box>
      <ServicesDataGrid
        services={services}
        isLoading={isLoading}
        onServiceUpdatedAction={fetchServices}
      />
    </Box>
  );
}
