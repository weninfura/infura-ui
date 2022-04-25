import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AdminHome from './admin/containers/AdminHome';
import Page404 from './containers/Page404';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={AdminHome} exact />
      <Route component={Page404} />

      {/* not found */}
      <Route component={() => <Redirect to="/" />} />
    </Switch>
  </Router>
);

export default App;
