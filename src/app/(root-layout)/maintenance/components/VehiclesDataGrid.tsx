'use client';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { FC } from 'react';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import { Vehicle } from '@/app/types';
import { cn } from '@stackframe/stack-ui';

type Props = {
  vehicles: Vehicle[];
};

export const VehiclesDatGrid: FC<Props> = ({ vehicles }) => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200 },
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
      valueGetter: (value: { id: string; name: string | null; email: string | null }) => {
        console.log('AAA', value);
        return value.name || value.email || 'N/A';
      },
    },
  ];

  return <DataGrid rows={vehicles} columns={columns} />;
};
