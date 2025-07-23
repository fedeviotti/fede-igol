import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: '240px',
        bgcolor: 'primary.dark',
        color: 'white',
        padding: '1rem',
        height: '100%', // importante per occupare altezza rimanente
      }}
    >
      <aside>
        <Typography variant="h5">Menu</Typography>
        <nav>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: 'white', fontSize: 'inherit' }}>
                  <SpaceDashboardOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: 'white', fontSize: 'inherit' }}>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </aside>
    </Box>
  );
}
