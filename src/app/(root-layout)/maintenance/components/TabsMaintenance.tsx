'use client';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import AddVehicleButtonModal from '@/app/(root-layout)/maintenance/components/AddVehicleButtonModal';
import { Garage, Vehicle } from '@/app/types';
import { VehiclesDatGrid } from '@/app/(root-layout)/maintenance/components/VehiclesDataGrid';
import { GaragesDatGrid } from '@/app/(root-layout)/maintenance/components/GaragesDataGrid';
import AddGarageButtonModal from '@/app/(root-layout)/maintenance/components/AddGarageButtonModal';

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

type Props = {
  vehicles: Vehicle[];
  garages: Garage[];
};

export default function TabsMaintenance({ vehicles, garages }: Props) {
  // TODO: Salva il tab selezionato nello store di Zustand per ricordare l'ultima selezione
  // quando l'utente torna su pagina dalla pagina dei servizi
  const [value, setValue] = useState(2);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Servizi in scadenza" {...a11yProps(0)} />
          <Tab label="Servizi" {...a11yProps(1)} />
          <Tab label="Veicoli" {...a11yProps(2)} />
          <Tab label="Officine" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Servizi in scadenza
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Servizi (tabella + aggiungi servizio)
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box className="flex flex-col gap-4 h-full">
          <Box className="flex gap-4">
            <AddVehicleButtonModal />
          </Box>
          <Box className="flex grow">
            <VehiclesDatGrid vehicles={vehicles} />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box className="flex flex-col gap-4 h-full">
          <Box className="flex gap-4">
            <AddGarageButtonModal />
          </Box>
          <Box className="flex grow">
            <GaragesDatGrid garages={garages} />
          </Box>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
