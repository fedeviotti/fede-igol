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
import { FC, useState } from 'react';
import { User } from '@/app/types';
import { formatItalianDate } from '@/app/utils/utils';
import { useVehicles } from '@/store/store';
import { deleteVehicle } from '../actions';
import { DialogDelete } from './DialogDelete';

type Props = {
  onVehicleUpdatedAction?: () => void;
};

export const VehiclesDatGrid: FC<Props> = ({ onVehicleUpdatedAction }) => {
  const vehicles = useVehicles();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<number | null>(null);

  const openVehicleHandler = (id: GridRowId) => {
    router.push(`/maintenance/home/vehicle/${id}`);
  };

  const onEditVehicleHandler = (id: GridRowId) => {
    console.log(`Edit vehicle with ID: ${id}`);
  };

  const onDeleteVehicleHandler = (id: GridRowId) => {
    setVehicleToDelete(Number(id));
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (vehicleToDelete) {
      try {
        await deleteVehicle(vehicleToDelete);
        onVehicleUpdatedAction?.();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
    setDeleteDialogOpen(false);
    setVehicleToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setVehicleToDelete(null);
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
    {
      field: 'createdAt',
      headerName: 'Data creazione',
      width: 150,
      valueGetter: formatItalianDate,
    },
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
      width: 120,
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
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Elimina"
          onClick={() => onDeleteVehicleHandler(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <DataGrid rows={vehicles} columns={columns} />
      <DialogDelete
        open={deleteDialogOpen}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteConfirm={handleDeleteConfirm}
        dialogContextText={
          'Sei sicuro di voler eliminare questo veicolo? Questa azione è irreversibile.'
        }
      />
    </>
  );
};
