import { PropsWithChildren, FC } from 'react';
import { Box, Typography } from '@mui/material';

type Props = PropsWithChildren<{
  title: string;
}>;

export const ContentLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Box sx={{ py: 2 }}>{children}</Box>
    </>
  );
};
