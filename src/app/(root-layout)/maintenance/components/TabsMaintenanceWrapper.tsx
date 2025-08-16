'use client';

import { FC, useCallback, useState } from 'react';
import { Garage, Service, Vehicle } from '@/app/types';
import TabsMaintenance from './TabsMaintenance';

type Props = {
  initialVehicles: Vehicle[];
  initialGarages: Garage[];
  initialServices: Service[];
};

export const TabsMaintenanceWrapper: FC<Props> = ({
  initialVehicles,
  initialGarages,
  initialServices,
}) => {
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [garages] = useState<Garage[]>(initialGarages);
  const [services, setServices] = useState<Service[]>(initialServices);

  const refreshServices = useCallback(async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error refreshing services:', error);
    }
  }, []);

  return (
    <TabsMaintenance
      vehicles={vehicles}
      garages={garages}
      services={services}
      onServiceUpdatedAction={refreshServices}
    />
  );
};
