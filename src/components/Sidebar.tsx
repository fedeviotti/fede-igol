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
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

const items = [
  { label: 'Manuntenzioni', href: '/', icon: <BuildCircleOutlinedIcon /> },
  { label: 'Dashboard', href: '/profilo', icon: <SpaceDashboardOutlinedIcon /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      <Box
        sx={{
          width: isOpen ? 240 : 72,
          bgcolor: 'primary.dark',
          color: 'white',
          padding: '0.75rem',
          overflow: 'hidden',
          transition: 'width 0.3s',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {items.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={NextLink}
                href={item.href}
                selected={pathname === item.href}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '4px',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '4px',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '4px',
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
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderRadius: '4px',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderRadius: '4px',
                },
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderRadius: '4px',
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
