'use client';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Box
        sx={{
          width: isOpen ? 240 : 72,
          bgcolor: 'primary.dark',
          color: 'white',
          padding: '0.5rem',
          //height: '100%', // importante per occupare altezza rimanente
          overflow: 'hidden',
          transition: 'width 0.3s',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white', fontSize: 'inherit' }}>
                <BuildCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manutenzioni" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white', fontSize: 'inherit' }}>
                <SpaceDashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white', fontSize: 'inherit' }}>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <IconButton
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          fontSize: '.8rem',
          position: 'absolute',
          padding: '4px',
          top: 98,
          left: isOpen ? 229 : 61,
          zIndex: 1300,
          transition: 'left 0.3s',
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.light' },
        }}
      >
        {isOpen ? (
          <ArrowBackIosOutlinedIcon fontSize="inherit" />
        ) : (
          <ArrowForwardIosOutlinedIcon fontSize="inherit" />
        )}
      </IconButton>
    </>
  );
}
