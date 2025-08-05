import TabsMaintenance from '@components/TabsMaintenance';
import { LinearProgress } from '@mui/material';
import { getGarages, getServices, getVehicles } from '@/app/(root-layout)/maintenance/actions';
import { Service } from '@/app/types';

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  const garages = await getGarages();
  const services = await getServices();

  if (vehicles === null) {
    return <LinearProgress />;
  }

  return <TabsMaintenance vehicles={vehicles} garages={garages} services={services as Service[]} />;
}
