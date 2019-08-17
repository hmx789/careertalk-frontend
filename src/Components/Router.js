import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from '../Routes/Auth';
import Fairs from '../Routes/Fairs';
import EmployerList from '../Routes/EmployerList';
import About from '../Routes/About';
import Template from '../Routes/Template';
import GetInvolved from '../Routes/GetInvolved';
import FavoritesList from '../Routes/FavoritesList';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Fairs} />
    <Route exact path="/auth" component={Auth} />
    <Route path="/fair/:fairId/employers" component={EmployerList} />
    <Route path="/template" component={Template} />
    <Route path="/about" component={About} />
    <Route path="/get-invloced" component={GetInvolved} />
    <Route path="/favorites" component={FavoritesList} />
    <Redirect from="*" to="/" />
  </Switch>
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default Router;
