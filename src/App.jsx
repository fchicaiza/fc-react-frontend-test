import React, { useState } from 'react'
import dataSeries from './data/tblSeries.json';
import dataOvservations from './data/tblObservations.json'
import dataLockedPeriods from './data/tblLockedPeriods.json'
import dataHierarchy from './data/tblHierarchy.json'
import { DataGridComponent } from './components/DataGridComponent';
import { Navbar } from './components/Navbar';
import './App.css'


export const App = () => {

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: '20px', padding: '20px' }}>
        <DataGridComponent
          dataOvservations={dataOvservations}
          dataLockedPeriods={dataLockedPeriods}
          dataHierarchy={dataHierarchy}
          dataSeries={dataSeries}
        />
      </div>
    </div>
  );
}

export default App
