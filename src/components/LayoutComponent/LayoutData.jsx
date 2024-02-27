import React from "react";
import {

  BarChart,
  Contacts,
  Task,
  Unarchive,
  FactCheck,

} from "@mui/icons-material";

export const LayoutElements = [
 

  {
    title: "Comprobantes",
    icon: <BarChart />,
    cName: "nav-text",
    subMenu: [
      {
        title: "Emitidos",
        icon: <Unarchive />,
        path: "/reportes/emitidos",
        // path: "/reportes",
        cName: "nav-text-sub sub-menu-item",
      },
      {
        title: "Autorizados",
        icon: <Task />,
        path: "/reportes/autorizados",
        cName: "nav-text-sub sub-menu-item",
      },
      {
        title: "Autorizados por cliente",
        icon: <Contacts />,
        path: "/reportes/autorizados-por-cliente",
        cName: "nav-text-sub sub-menu-item",
      },
      {
        title: "Autorizados por producto",
        icon: <FactCheck />,
        path: "/reportes/autorizados-por-item",
        cName: "nav-text-sub sub-menu-item",
      }
    ]
  }
];
