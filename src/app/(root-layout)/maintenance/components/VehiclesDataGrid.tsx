'use client';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
} from '@mui/x-data-grid';
import { FC } from 'react';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { User, Vehicle } from '@/app/types';
import { useRouter } from 'next/navigation';

type Props = {
  vehicles: Vehicle[];
};

export const VehiclesDatGrid: FC<Props> = ({ vehicles }) => {
  const router = useRouter();

  const openVehicleHandler = (id: GridRowId) => {
    router.push(`/maintenance/home/${id}`);
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
