import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import AppLayout from './layouts/AppLayout';
import Tasks from './pages/Tasks';
import NoMatch from './pages/errors/NoMatch';

const App = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout  {...props}/>}>
          <Route index element={<Tasks />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
