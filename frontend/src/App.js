import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Login from './components/Login';
import Dashboard from './Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route 
            exact path='/' 
            render={props => 
              <Login {...props} setAuth={setAuth} />
            }
          />
          <PrivateRoute 
            path="/dashboard"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;