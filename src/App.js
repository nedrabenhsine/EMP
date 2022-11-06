import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './views/Dashboard';
import WildDays from './views/WildDays';
import Login from './views/Login';
import Employers from './views/Employers';
import Remote from './views/Remote';
import Permissions from './views/Permissions';
function App() {
  console.log("emp");

  return (
    <div>
      <Router forceRefresh={true} >
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/wliddays' element={<WildDays />} />
          <Route path='/employers' element={<Employers />} />
          <Route path='/permissions' element={<Permissions />} />
          <Route path='/remote' element={<Remote />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
