import Admin from 'pages/Admin';
import Timetable from 'pages/Timetable';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Timetable />
        </Route>
      </Switch>
    </Router>
  );
}
