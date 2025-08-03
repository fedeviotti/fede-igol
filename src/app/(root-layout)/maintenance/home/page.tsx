import TabsMaintenance from '@/app/(root-layout)/maintenance/components/TabsMaintenance';
import { getGarages, getVehicles } from '@/app/(root-layout)/maintenance/actions';
import { LinearProgress } from '@mui/material';

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  const garages = await getGarages();

  if (vehicles === null) {
    return <LinearProgress />;
  }

  return <TabsMaintenance vehicles={vehicles} garages={garages} />;
}
