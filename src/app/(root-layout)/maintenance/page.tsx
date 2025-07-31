import { VehiclesPage } from '@/app/(root-layout)/maintenance/components/VehiclesPage';
import { Box, Button } from '@mui/material';
import VehicleFormModal from '@/app/(root-layout)/maintenance/components/VehicleFormModal';

export default function MaintenancePage() {
  // TODO: fare form inserimento veicolo (insertVehicle) e verificare che la tabella
  //  venga aggioranta (grazie a revalidatePath)
  return (
    <Box className="flex flex-col gap-4 h-full">
      <Box className="flex gap-4">
        <VehicleFormModal />
      </Box>
      <VehiclesPage />
    </Box>
  );
}
