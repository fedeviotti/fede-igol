import { FC } from 'react';
import { getVehicles } from '@/app/(root-layout)/maintenance/actions';
import { LinearProgress } from '@mui/material';
import { VehiclesDatGrid } from '@/app/(root-layout)/maintenance/components/VehiclesDataGrid';

export const VehiclesPage: FC = async () => {
  const vehicles = await getVehicles();

  if (vehicles === null) {
    return <LinearProgress />;
  }

  return <VehiclesDatGrid vehicles={vehicles} />;
};
