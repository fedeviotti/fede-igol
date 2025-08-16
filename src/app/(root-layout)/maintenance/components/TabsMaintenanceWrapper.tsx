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
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [garages, setGarages] = useState<Garage[]>(initialGarages);
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

  const refreshVehicles = useCallback(async () => {
    try {
      const response = await fetch('/api/vehicles');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error refreshing vehicles:', error);
    }
  }, []);

  const refreshGarages = useCallback(async () => {
    try {
      const response = await fetch('/api/garages');
      const data = await response.json();
      setGarages(data);
    } catch (error) {
      console.error('Error refreshing garages:', error);
    }
  }, []);

  return (
    <TabsMaintenance
      vehicles={vehicles}
      garages={garages}
      services={services}
      onServiceUpdatedAction={refreshServices}
      onVehicleUpdatedAction={refreshVehicles}
      onGarageUpdatedAction={refreshGarages}
    />
  );
};
