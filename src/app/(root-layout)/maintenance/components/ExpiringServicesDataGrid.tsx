'use client';

import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Garage, Service, Vehicle } from '@/app/types';
import { getStatusChip } from '@/app/utils/getStatusChip';
import { checkExpirationStatus, formatItalianDate } from '@/app/utils/utils';

type Props = {
  services?: Service[];
  isLoading?: boolean;
  onServiceUpdatedAction?: () => void;
};

export const ExpiringServicesDataGrid: FC<Props> = ({ services, isLoading = false }) => {
  const router = useRouter();

  const openServiceHandler = (id: GridRowId) => {
    router.push(`/maintenance/home/service/${id}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Stato',
      minWidth: 150,
      valueGetter: (_value: Partial<Service>, row) => {
        return formatItalianDate(row?.expiredAt) || 'N/A';
      },
      renderCell: (params) => {
        const calculatedStatus = checkExpirationStatus(params.value, 'dd/MM/yyyy');
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
      field: 'executedAt',
      headerName: 'Data esecuzione',
      width: 150,
      valueGetter: formatItalianDate,
    },
    { field: 'expiredAt', headerName: 'Data scadenza', width: 150, valueGetter: formatItalianDate },
    {
      field: 'actions',
      type: 'actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="open"
          icon={<KeyboardArrowRightOutlinedIcon />}
          label="Apri"
          onClick={() => openServiceHandler(params.id)}
        />,
      ],
    },
  ];

  return <DataGrid rows={services} columns={columns} loading={isLoading} />;
};
