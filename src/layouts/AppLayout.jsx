import React from 'react';
import { Outlet } from "react-router-dom";

import NavBar from '../components/NavBar';

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
