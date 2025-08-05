'use client';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
} from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { User } from '@/app/types';
import { useVehicles } from '@/store/store';

export const VehiclesDatGrid: FC = () => {
  const vehicles = useVehicles();
  const router = useRouter();

  const openVehicleHandler = (id: GridRowId) => {
    router.push(`/maintenance/home/vehicle/${id}`);
  };

  const onEditVehicleHandler = (id: GridRowId) => {
    console.log(`Edit vehicle with ID: ${id}`);
  };

  const onDeleteVehicleHandler = (id: GridRowId) => {
    console.log(`Delete vehicle with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', minWidth: 200, flex: 1 },
    {
      field: 'type',
      headerName: 'Tipo',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        switch (params.value) {
          case 'car':
            return <DirectionsCarFilledOutlinedIcon />;
          case 'motorbike':
            return <PedalBikeOutlinedIcon />;
          case 'bike':
            return <DirectionsBikeOutlinedIcon />;
          default:
            return 'Altro';
        }
      },
    },
    { field: 'createdAt', headerName: 'Data creazione', width: 150 },
    {
      field: 'user',
      headerName: 'Proprietario',
      width: 200,
      valueGetter: (value: Partial<User>) => {
        return value?.name || value?.email || 'N/A';
      },
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key="open"
          icon={<KeyboardArrowRightOutlinedIcon />}
          label="Apri"
          onClick={() => openVehicleHandler(params.id)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditOutlinedIcon />}
          label="Modifica"
          onClick={() => onEditVehicleHandler(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Elimina"
          onClick={() => onDeleteVehicleHandler(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  return <DataGrid rows={vehicles} columns={columns} />;
};
