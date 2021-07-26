import React from 'react';
import '@fortawesome/fontawesome-free/js/all'
import 'bulma/css/bulma.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Clientes from './pages/clientes';
import axios from 'axios';

axios.interceptors.request.use(function(config){
  config.url = `${process.env.REACT_APP_API_BASE_URL}${config.url}`;
  return config;
});

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/clientes" component={Clientes}/>
        </Switch>
      </Router>
  );
}

export default App;
