import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { PAGE_NAMES } from '../constants';

const NavBar = () => {
  const location = useLocation();
  const pageName = PAGE_NAMES?.[location?.pathname];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0, bottom: 'auto' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default NavBar;
