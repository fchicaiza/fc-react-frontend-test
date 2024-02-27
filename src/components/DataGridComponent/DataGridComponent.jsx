import React, { useState, useEffect } from 'react';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

export const DataGridComponent = ({ dataSeries, dataHierarchy, dataOvservations, dataLockedPeriods }) => {

  const [dataGridId, setDataGridId] = useState(null)
  const series = dataSeries
  const hierarchy = dataHierarchy
  const observations = dataOvservations
  const lockedData = dataLockedPeriods


  //function to get Hierarcy level
  function getHierarchy(dataSeries, dataHierarchy) {
    const hierarchyMap = {};
    for (const s of dataSeries) {
      hierarchyMap[s.KY_ID] = { ...s, subChild: [], level: 0 };
    }
    for (const h of dataHierarchy) {
      const childNode = hierarchyMap[h.FK_SERIES];
      const parentNode = h.FK_PARENT_SERIES ? hierarchyMap[h.FK_PARENT_SERIES] : null;

      if (parentNode) {
        childNode.level = parentNode.level + 1;
        parentNode.subChild.push(childNode);
      } else {
        hierarchyMap[childNode.KY_ID] = childNode;
      }
    }
    return Object.values(hierarchyMap);
  }


  const hierarchicalData = getHierarchy(series, hierarchy);

  // Obtain uniqe Data in Object
  const uniqueHierarchicalData = hierarchicalData.filter((item, index, arr) => {
    return arr.findIndex((t) => t.KY_ID === item.KY_ID) === index;
  });
  const filteredData = uniqueHierarchicalData.filter(item => item.subChild.length > 0 && item.level === 0);
  const fields = { dataSource: filteredData, id: 'KY_ID', text: 'TX_DESCRIPTION', child: 'subChild' };

  // Get Ids in tree navigator
  const getIdtree = (e) => {
    const { dataset: { uid } } = e.target.parentElement;

    if (uid) {
      const id = parseInt(uid, 10);
      const dataLockedCell = lockedData.find(dl => dl.FK_SERIES == id);

      const dataGrid = observations
        .filter(dg => dg.FK_SERIES == id)
        .map(dg => ({
          FK_SERIES: dg.FK_SERIES,
          TX_PERIOD: dg.TX_PERIOD,
          QY_SALES: dg.QY_SALES,
          QY_DEMAND: dg.QY_DEMAND,
          QY_SUPPLY: dg?.QY_SUPPLY,
          TX_OPINION: dataLockedCell?.TX_OPINION
        }));

      setDataGridId(dataGrid);
      return dataGrid;
    } else {
      console.log("No data-uid attribute found");
    }
  };


  useEffect(() => {
    console.log('DataGridId ha cambiado:', dataGridId);
  }, [dataGridId]);

  // Format SyncFunction GRID
  const columns = [
    {
      field: 'TX_PERIOD', headerText: 'Period', width: '100', textAlign: 'Right', template: (rowData) => {
        const isOpinionColumn = rowData.TX_OPINION
        const backgroundColor = isOpinionColumn === 'TX_PERIOD' ? 'yellow' : 'transparent';
        return (
          <div style={{ backgroundColor }}>
            {rowData.TX_PERIOD != null ? rowData.TX_PERIOD : 'NULL'}
          </div>
        );
      },
    },
    {
      field: 'QY_SALES', headerText: 'Sales', width: '100',
      template: (rowData) => {
        const isOpinionColumn = rowData.TX_OPINION
        const backgroundColor = isOpinionColumn === 'QY_SALES' ? 'yellow' : 'transparent';
        return (
          <div style={{ backgroundColor }}>
            {rowData.QY_SALES != null ? rowData.QY_SALES : 'NULL'}
          </div>
        );
      },
    },
    { field: 'QY_DEMAND', headerText: 'Demand', width: '100', textAlign: 'Right',       template: (rowData) => {
      const isOpinionColumn = rowData.TX_OPINION
      const backgroundColor = isOpinionColumn === 'QY_DEMAND' ? 'yellow' : 'transparent';
      return (
        <div style={{ backgroundColor }}>
          {rowData.QY_DEMAND != null ? rowData.QY_DEMAND : 'NULL'}
        </div>
      );
    }, 
  },
    {
      field: 'QY_SUPPLY', headerText: 'Supply', width: '100', format: 'C2', textAlign: 'Right',
      template: (rowData) => {
        const isOpinionColumn = rowData.TX_OPINION
        const backgroundColor = isOpinionColumn === 'QY_SUPPLY' ? 'yellow' : 'transparent';
        return (
          <div style={{ backgroundColor }}>
            {rowData.QY_SUPPLY != null ? rowData.QY_SUPPLY : 'NULL'}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '1', marginBottom: '10px', marginRight: '10px' }}>
        <TreeViewComponent onClick={(e) => getIdtree(e)} fields={fields} />
      </div>
      <div style={{ flex: '2' }}>
        <GridComponent dataSource={dataGridId}>
          <ColumnsDirective>
            {columns.map((column, index) => (
              <ColumnDirective key={index} {...column} />
            ))}
          </ColumnsDirective>
        </GridComponent>
      </div>
    </div>
  );

}
export default DataGridComponent;