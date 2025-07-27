'use client';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { FC } from 'react';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import { Vehicle } from '@/app/types';

type Props = {
  vehicles: Vehicle[];
};

export const VehiclesDatGrid: FC<Props> = ({ vehicles }) => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200 },
    {
      field: 'type',
      headerName: 'Tipo',
      width: 300,
      renderCell: (params: GridRenderCellParams) => {
        switch (params.value) {
          case 'car':
            return <DirectionsCarFilledOutlinedIcon sx={{ mt: 1.5 }} />;
          case 'motorbike':
            return <PedalBikeOutlinedIcon sx={{ mt: 1.5 }} />;
          case 'bike':
            return <DirectionsBikeOutlinedIcon sx={{ mt: 1.5 }} />;
          default:
            return 'Altro';
        }
      },
    },
    { field: 'createdAt', headerName: 'Data creazione', width: 300 },
    {
      field: 'user',
      headerName: 'Proprietario',
      width: 300,
      valueGetter: (value: { id: string; name: string | null; email: string | null }) => {
        return value.name || value.email || 'N/A';
      },
    },
  ];

  return (
    <Box sx={{ height: 300, width: '100%' }}>
      <DataGrid rows={vehicles} columns={columns} />
    </Box>
  );
};
