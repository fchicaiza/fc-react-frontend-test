// DrawerComponent.jsx
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DrawerComponent = () => {
  const [openPais, setOpenPais] = useState(false);
  const [openCiudad, setOpenCiudad] = useState(false);

  const handlePaisClick = () => {
    setOpenPais(!openPais);
    setOpenCiudad(false);
  };

  const handleCiudadClick = () => {
    setOpenCiudad(!openCiudad);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button onClick={handlePaisClick}>
          <ListItemText primary="PAIS" />
          <ArrowForwardIosIcon style={{ transform: openPais ? 'rotate(90deg)' : 'rotate(0deg)' }} />
        </ListItem>
        <Collapse in={openPais} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
            <ListItem button onClick={handleCiudadClick}>
              <ListItemText primary="Ciudad" />
              <ArrowForwardIosIcon style={{ transform: openCiudad ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </ListItem>
            <Collapse in={openCiudad} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ paddingLeft: '40px' }}>
                <ListItem button>
                  <ListItemText primary="Barrio" />
                </ListItem>
                {/* Add more items for Barrio or other nested levels as needed */}
              </List>
            </Collapse>
          </List>
        </Collapse>
        {/* Add more items for PAIS or other top-level items as needed */}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
