import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/views/LandingPage';
import LoginPage from './components/views/LoginPage';
import RegisterPage from './components/views/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
