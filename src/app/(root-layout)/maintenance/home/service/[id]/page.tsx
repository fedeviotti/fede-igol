'use client';

import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useState } from 'react';
import { Service } from '@/app/types';
import { formatItalianDate } from '@/app/utils/utils';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ServiceDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const renderVehicleTypeIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <DirectionsCarFilledOutlinedIcon />;
      case 'motorbike':
        return <PedalBikeOutlinedIcon />;
      case 'bike':
        return <DirectionsBikeOutlinedIcon />;
      default:
        return 'Altro';
    }
  };

  const fetchService = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/services/${id}`);
      if (!res.ok) {
        throw new Error('Servizio non trovato');
      }
      const data = await res.json();
      setService(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento del servizio');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-[400px]">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !service) {
    return (
      <Box className="flex flex-col gap-4">
        <Box className="flex gap-4 items-center">
          <IconButton onClick={() => router.back()} aria-label="Torna indietro">
            <NavigateBeforeOutlinedIcon />
          </IconButton>
          <Typography variant="h5">Dettaglio Servizio</Typography>
        </Box>
        <Card>
          <CardContent>
            <Typography color="error">{error || 'Servizio non trovato'}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-4">
      <Box className="flex gap-4 items-center">
        <IconButton onClick={() => router.back()} aria-label="Torna indietro">
          <NavigateBeforeOutlinedIcon />
        </IconButton>
        <Typography variant="h5">Dettaglio Servizio</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {service.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Prezzo
              </Typography>
              <Typography variant="body1" className="font-semibold">
                € {service.price}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Data Esecuzione
              </Typography>
              <Typography variant="body1">
                {service.executedAt ? formatItalianDate(service.executedAt) : 'Non specificata'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Data Scadenza
              </Typography>
              <Typography variant="body1">
                {service.expiredAt ? formatItalianDate(service.expiredAt) : 'Non specificata'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Stato
              </Typography>
              <Chip
                label={
                  service.expiredAt && new Date(service.expiredAt) < new Date()
                    ? 'Scaduto'
                    : 'Attivo'
                }
                color={
                  service.expiredAt && new Date(service.expiredAt) < new Date()
                    ? 'error'
                    : 'success'
                }
                size="small"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Veicolo
              </Typography>
              <Card variant="outlined">
                <CardContent sx={{ py: 2 }}>
                  {service.vehicle ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" className="font-medium">
                        {service.vehicle.name}
                      </Typography>
                      {renderVehicleTypeIcon(service.vehicle.type)}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Nessun veicolo associato
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Garage
              </Typography>
              <Card variant="outlined">
                <CardContent sx={{ py: 2 }}>
                  {service.garage ? (
                    <Typography variant="body1" className="font-medium">
                      {service.garage.name}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Nessun garage associato
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
