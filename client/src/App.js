import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Alert from './components/layout/Alert';
import SetAuthToken from './utils/SetAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <div className='container'>
          <Alert />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
