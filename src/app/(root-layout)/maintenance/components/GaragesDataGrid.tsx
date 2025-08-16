'use client';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { deleteGarage } from '@/app/(root-layout)/maintenance/actions';
import { Garage } from '@/app/types';
import { DialogDelete } from './DialogDelete';
import { EditGarageModal } from './EditGarageModal';

type Props = {
  garages: Garage[];
  onGarageUpdatedAction?: () => void;
};

export const GaragesDatGrid: FC<Props> = ({ garages, onGarageUpdatedAction }) => {
  const [editGarage, setEditGarage] = useState<Garage | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteGarageId, setDeleteGarageId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const onEditGarageHandler = (id: GridRowId) => {
    const garage = garages.find((g) => g.id === id);
    if (garage) {
      setEditGarage(garage);
      setIsEditModalOpen(true);
    }
  };

  const onDeleteGarageHandler = (id: GridRowId) => {
    setDeleteGarageId(Number(id));
    setIsDeleteDialogOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditGarage(null);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setDeleteGarageId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteGarageId) {
      try {
        await deleteGarage(deleteGarageId);
        onGarageUpdatedAction?.();
      } catch (error) {
        console.error('Error deleting garage:', error);
      }
      handleDeleteDialogClose();
      setDeleteGarageId(null);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', minWidth: 200, flex: 1 },
    { field: 'createdAt', headerName: 'Data creazione', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditOutlinedIcon />}
          label="Modifica"
          onClick={() => onEditGarageHandler(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Elimina"
          onClick={() => onDeleteGarageHandler(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <DataGrid rows={garages} columns={columns} />
      <EditGarageModal
        garage={editGarage}
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        onGarageUpdatedAction={onGarageUpdatedAction}
      />
      <DialogDelete
        open={isDeleteDialogOpen}
        handleDeleteCancel={handleDeleteDialogClose}
        handleDeleteConfirm={handleDeleteConfirm}
        dialogContextText={`Sei sicuro di voler eliminare l'officina "${
          garages.find((g) => g.id === deleteGarageId)?.name
        }"?`}
      />
    </>
  );
};
