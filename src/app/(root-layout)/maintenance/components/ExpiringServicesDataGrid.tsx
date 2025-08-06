'use client';

import { Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { addDays, isBefore, isWithinInterval, parse, startOfDay } from 'date-fns';
import { FC } from 'react';
import { Garage, Service, Vehicle } from '@/app/types';
import { formatItalianDate } from '@/app/utils/utils';

type Props = {
  services?: Service[];
  isLoading?: boolean;
};

const checkExpirationStatus = (dateString: string): 'expired' | 'expiringSoon' | 'valid' => {
  const date = parse(dateString, 'dd/MM/yyyy', new Date());
  const today = startOfDay(new Date());
  const oneWeekFromNow = addDays(today, 7);

  if (isBefore(date, today)) {
    return 'expired';
  }

  if (isWithinInterval(date, { start: today, end: oneWeekFromNow })) {
    return 'expiringSoon';
  }

  return 'valid'; // after next week
};

const getStatusChip = (status: 'expired' | 'expiringSoon' | 'valid') => {
  switch (status) {
    case 'expired':
      return <Chip label="Scaduto" color="error" variant="outlined" />;
    case 'expiringSoon':
      return <Chip label="In scadenza" color="warning" variant="outlined" />;
    case 'valid':
      return <Chip label="Valido" color="success" variant="outlined" />;
  }
};

export const ExpiringServicesDataGrid: FC<Props> = ({ services, isLoading = false }) => {
  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Stato',
      minWidth: 150,
      valueGetter: (_value: Partial<Service>, row) => {
        return formatItalianDate(row?.expiredAt) || 'N/A';
      },
      renderCell: (params) => {
        // value is a date string, format it to 'dd/MM/yyyy'
        const calculatedStatus = checkExpirationStatus(params.value);
        return getStatusChip(calculatedStatus);
      },
    },
    { field: 'name', headerName: 'Nome', minWidth: 200, flex: 1 },
    {
      field: 'vehicle',
      headerName: 'Veicolo',
      width: 200,
      valueGetter: (value: Partial<Vehicle>) => {
        return value?.name || 'N/A';
      },
    },
    {
      field: 'garage',
      headerName: 'Garage',
      width: 200,
      valueGetter: (value: Partial<Garage>) => {
        return value?.name || 'N/A';
      },
    },
    {
      field: 'createdAt',
      headerName: 'Data creazione',
      width: 150,
      valueGetter: formatItalianDate,
    },
    { field: 'expiredAt', headerName: 'Data scadenza', width: 150, valueGetter: formatItalianDate },
  ];

  return <DataGrid rows={services} columns={columns} loading={isLoading} />;
};
