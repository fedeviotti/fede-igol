'use client';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { FC } from 'react';
import { Garage } from '@/app/types';

type Props = {
  garages: Garage[];
};

export const GaragesDatGrid: FC<Props> = ({ garages }) => {
  const onEditGarageHandler = (id: GridRowId) => {
    console.log(`Edit garage with ID: ${id}`);
  };

  const onDeleteGarageHandler = (id: GridRowId) => {
    console.log(`Delete garage with ID: ${id}`);
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
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Elimina"
          onClick={() => onDeleteGarageHandler(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  return <DataGrid rows={garages} columns={columns} />;
};
