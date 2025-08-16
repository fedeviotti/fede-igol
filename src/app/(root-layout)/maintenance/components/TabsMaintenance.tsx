'use client';

import { AddGarageButtonModal } from '@components/AddGarageButtonModal';
import { AddServiceButtonModal } from '@components/AddServiceButtonModal';
import { AddVehicleButtonModal } from '@components/AddVehicleButtonModal';
import { ExpiringServicesDataGrid } from '@components/ExpiringServicesDataGrid';
import { GaragesDatGrid } from '@components/GaragesDataGrid';
import { ServicesDataGrid } from '@components/ServicesDataGrid';
import { VehiclesDatGrid } from '@components/VehiclesDataGrid';
import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { Garage, Service, Vehicle } from '@/app/types';
import { useStoreActions } from '@/store/store';

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
      {value === index && <Box>{children}</Box>}
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
  services: Service[];
  onServiceUpdatedAction?: () => void;
  onVehicleUpdatedAction?: () => void;
  onGarageUpdatedAction?: () => void;
};

export default function TabsMaintenance({
  vehicles,
  garages,
  services,
  onServiceUpdatedAction: refresh,
  onVehicleUpdatedAction: refreshVehicles,
  onGarageUpdatedAction: refreshGarages,
}: Props) {
  const { setVehicles, setGarages } = useStoreActions();
  const [value, setValue] = useState(2);

  useEffect(() => {
    setVehicles(vehicles);
  }, [vehicles, setVehicles]);

  useEffect(() => {
    setGarages(garages);
  }, [garages, setGarages]);

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
        <Box className="pt-2 h-full">
          <Box className="tabs-maintenance-data-grid-height">
            <ExpiringServicesDataGrid services={services} onServiceUpdatedAction={refresh} />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box className="flex flex-col gap-2 pt-2 h-full">
          <Box className="flex gap-4">
            <AddServiceButtonModal onServiceAddedAction={refresh} />
          </Box>
          <Box className="tabs-maintenance-data-grid-height">
            <ServicesDataGrid services={services} onServiceUpdatedAction={refresh} />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box className="flex flex-col gap-2 pt-2 h-full">
          <Box className="flex gap-4">
            <AddVehicleButtonModal onVehicleAddedAction={refreshVehicles} />
          </Box>
          <Box className="tabs-maintenance-data-grid-height">
            <VehiclesDatGrid onVehicleUpdatedAction={refreshVehicles} />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box className="flex flex-col gap-2 pt-2 h-full">
          <Box className="flex gap-4">
            <AddGarageButtonModal onGarageAddedAction={refreshGarages} />
          </Box>
          <Box className="tabs-maintenance-data-grid-height">
            <GaragesDatGrid garages={garages} onGarageUpdatedAction={refreshGarages} />
          </Box>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
