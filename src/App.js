import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/wliddays' component={WildDays} />
          <Route path='/employers' component={Employers} />
          <Route path='/permissions' component={Permissions} />
          <Route path='/remote' component={Remote} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
