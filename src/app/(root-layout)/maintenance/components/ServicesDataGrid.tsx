'use client';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { Garage, Service, Vehicle } from '@/app/types';
import { formatItalianDate } from '@/app/utils/utils';
import { EditServiceModal } from './EditServiceModal';

type Props = {
  services?: Service[];
  isLoading?: boolean;
  onServiceUpdatedAction?: () => void;
};

export const ServicesDataGrid: FC<Props> = ({
  services,
  isLoading = false,
  onServiceUpdatedAction,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const onEditServiceHandler = (id: GridRowId) => {
    const service = services?.find((s) => s.id === id);
    if (service) {
      setSelectedService(service);
      setEditModalOpen(true);
    }
  };

  const onDeleteServiceHandler = (id: GridRowId) => {
    console.log(`Delete service with ID: ${id}`);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedService(null);
  };

  const columns: GridColDef[] = [
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
      field: 'price',
      headerName: 'Prezzo',
      width: 100,
      valueFormatter: (value) => {
        return `€ ${value}`;
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
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditOutlinedIcon />}
          label="Modifica"
          onClick={() => onEditServiceHandler(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Elimina"
          onClick={() => onDeleteServiceHandler(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <DataGrid rows={services} columns={columns} loading={isLoading} />
      <EditServiceModal
        service={selectedService}
        open={editModalOpen}
        onClose={handleEditModalClose}
        onServiceUpdatedAction={onServiceUpdatedAction}
      />
    </>
  );
};
