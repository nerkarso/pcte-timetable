import Admin from 'pages/admin/index';
import Timetable from 'pages/Timetable';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Timetable} />
      </Switch>
    </Router>
  );
}
