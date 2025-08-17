'use client';

import { Notifications, Schedule, Warning } from '@mui/icons-material';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getExpiringServices } from '@/app/(root-layout)/maintenance/actions';

interface ExpiringService {
  id: number;
  name: string;
  expiredAt: string;
  vehicle: {
    name: string;
    type: string;
  } | null;
  garage: {
    name: string;
  } | null;
}

export default function NotificationBell() {
  const [expiringServices, setExpiringServices] = useState<ExpiringService[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchExpiringServices = async () => {
      try {
        const services = await getExpiringServices();
        // Filter out services with null expiredAt and null vehicle/garage
        const validServices = services.filter(
          (service) => service.expiredAt && service.vehicle && service.garage
        ) as ExpiringService[];
        setExpiringServices(validServices);
      } catch (error) {
        console.error('Error fetching expiring services:', error);
        setExpiringServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringServices();

    // Refresh every hour
    const interval = setInterval(fetchExpiringServices, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDaysUntilExpiry = (expiredAt: string) => {
    const expiryDate = parseISO(expiredAt);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryColor = (days: number) => {
    if (days < 0) return 'error.main';
    if (days <= 3) return 'warning.main';
    return 'info.main';
  };

  const onclickHandler = (serviceId: number) => {
    router.push(`/maintenance/home/service/${serviceId}`);
    handleClose();
  };

  if (loading) {
    return (
      <IconButton color="inherit" disabled>
        <Notifications />
      </IconButton>
    );
  }

  return (
    <>
      <Tooltip title={`${expiringServices.length} servizi in scadenza`}>
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={expiringServices.length} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 400, maxHeight: 500 },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="div">
            Servizi in scadenza
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {expiringServices.length === 0
              ? 'Nessun servizio in scadenza'
              : `${expiringServices.length} servizi da controllare`}
          </Typography>
        </Box>

        {expiringServices.length > 0 && (
          <Box>
            <Divider />
            {expiringServices.map((service) => {
              const daysUntilExpiry = getDaysUntilExpiry(service.expiredAt);
              const isExpired = daysUntilExpiry < 0;

              return (
                <MenuItem
                  key={service.id}
                  sx={{ py: 1.5 }}
                  onClick={() => onclickHandler(service.id)}
                >
                  <ListItemIcon>
                    {isExpired ? <Warning color="error" /> : <Schedule color="warning" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={service.name}
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          Veicolo: {service.vehicle?.name} ({service.vehicle?.type})
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Officina: {service.garage?.name}
                        </Typography>
                        <br />
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            color: getExpiryColor(daysUntilExpiry),
                            fontWeight: 'bold',
                          }}
                        >
                          {isExpired
                            ? `Scaduto da ${Math.abs(daysUntilExpiry)} giorni`
                            : `Scade tra ${daysUntilExpiry} giorni`}
                        </Typography>
                      </>
                    }
                  />
                </MenuItem>
              );
            })}
          </Box>
        )}
      </Menu>
    </>
  );
}
