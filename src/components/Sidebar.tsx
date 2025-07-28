'use client';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

const items = [
  { label: 'Home', href: '/', icon: <CottageOutlinedIcon /> },
  { label: 'Manutenzioni', href: '/maintenance', icon: <BuildCircleOutlinedIcon /> },
  { label: 'Dashboard', href: '/dashboard', icon: <SpaceDashboardOutlinedIcon /> },
];

const drawerWidthOpen = 240;
const drawerWidthClose = 57;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidthOpen : drawerWidthClose,
        transition: 'width 0.3s',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          transition: 'width 0.3s',
          width: isOpen ? drawerWidthOpen : drawerWidthClose,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'auto',
          bgcolor: 'primary.dark',
          height: '100%',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setIsOpen((prev) => !prev)}
              sx={{
                color: 'white',
              }}
            >
              <ListItemIcon sx={{ ml: '5px', color: 'white', fontSize: '14px' }}>
                {isOpen ? (
                  <ArrowBackIosOutlinedIcon sx={{ fontSize: 'inherit' }} />
                ) : (
                  <ArrowForwardIosOutlinedIcon sx={{ fontSize: 'inherit' }} />
                )}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {items.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={NextLink}
                href={item.href}
                selected={pathname === item.href}
                sx={{
                  color: 'white',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', fontSize: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListItem disablePadding>
            <ListItemButton
              component={NextLink}
              href="/settings"
              selected={pathname === '/settings'}
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', fontSize: 'inherit' }}>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
