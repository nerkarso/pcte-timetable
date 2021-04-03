import Admin from 'pages/admin/index';
import Error from 'pages/Error';
import Timetable from 'pages/Timetable';
import Welcome from 'pages/Welcome';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Timetable} exact />
        <Route path="/welcome" component={Welcome} />
        <Route path="/admin" component={Admin} />
        <Route path="/error" component={Error} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}
