import { FC } from 'react';
import { getVehicles } from '@/app/(root-layout)/maintenance/actions';
import { Box, LinearProgress } from '@mui/material';
import { VehiclesDatGrid } from '@/app/(root-layout)/maintenance/components/VehiclesDataGrid';

export const VehiclesPage: FC = async () => {
  const vehicles = await getVehicles();

  if (vehicles === null) {
    return <LinearProgress />;
  }

  return (
    <Box className="flex grow">
      <VehiclesDatGrid vehicles={vehicles} />
    </Box>
  );
};
