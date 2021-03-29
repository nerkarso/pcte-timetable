import Admin from 'pages/admin/index';
import Timetable from 'pages/Timetable';
import Welcome from 'pages/Welcome';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Timetable} />
      </Switch>
    </Router>
  );
}
