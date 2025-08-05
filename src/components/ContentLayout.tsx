import { Box, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
}>;

export const ContentLayout: FC<Props> = ({ children, title }) => {
  return (
    <Box className="flex flex-col gap-4 h-full">
      <Typography variant="h4">{title}</Typography>
      <Box className="h-[calc(100%-2rem)]">{children}</Box>
    </Box>
  );
};
