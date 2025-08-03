'use client';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { FC } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Service, Vehicle } from '@/app/types';
import { useRouter } from 'next/navigation';

type Props = {
  services: Service[];
};

export const ServicesDataGrid: FC<Props> = ({ services }) => {
  const router = useRouter();

  const openServiceHandler = (id: GridRowId) => {
    router.push(`/maintenance/home/service/${id}`);
  };

  const onEditServiceHandler = (id: GridRowId) => {
    console.log(`Edit service with ID: ${id}`);
  };

  const onDeleteServiceHandler = (id: GridRowId) => {
    console.log(`Delete service with ID: ${id}`);
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
    { field: 'createdAt', headerName: 'Data creazione', width: 150 },
    { field: 'expiredAt', headerName: 'Data scadenza', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key="open"
          icon={<KeyboardArrowRightOutlinedIcon />}
          label="Apri"
          onClick={() => openServiceHandler(params.id)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditOutlinedIcon />}
          label="Modifica"
          onClick={() => onEditServiceHandler(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Elimina"
          onClick={() => onDeleteServiceHandler(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  return <DataGrid rows={services} columns={columns} />;
};
