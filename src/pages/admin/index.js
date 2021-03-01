import Logo from 'assets/logo.png';
import ButtonChangeTheme from 'components/ButtonChangeTheme';
import Classrooms from 'pages/admin/Classrooms';
import Faculties from 'pages/admin/Faculties';
import Subjects from 'pages/admin/Subjects';
import Timetables from 'pages/admin/Timetables';
import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import 'styles/Admin.scss';

export default function Admin() {
  const { path } = useRouteMatch();

  return (
    <>
      <Header />
      <main className="main admin__main">
        <Switch>
          <Route path={`${path}`} exact component={Timetables} />
          <Route path={`${path}/classrooms`} component={Classrooms} />
          <Route path={`${path}/subjects`} component={Subjects} />
          <Route path={`${path}/faculties`} component={Faculties} />
        </Switch>
      </main>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <img src={Logo} className="header__brand__image" alt="Logo" />
          <h3>Admin</h3>
        </div>
        <div className="header__tabs tabs--top">
          <nav className="tabs__grid">
            <NavLink to="/admin" exact className="tabs__grid__item" activeClassName="tabs__grid__item--active">
              Timetables
            </NavLink>
            <NavLink to="/admin/classrooms" className="tabs__grid__item" activeClassName="tabs__grid__item--active">
              Classrooms
            </NavLink>
            <NavLink to="/admin/subjects" className="tabs__grid__item" activeClassName="tabs__grid__item--active">
              Subjects
            </NavLink>
            <NavLink to="/admin/faculties" className="tabs__grid__item" activeClassName="tabs__grid__item--active">
              Faculties
            </NavLink>
          </nav>
        </div>
        <div className="header__buttons">
          <ButtonChangeTheme />
        </div>
      </div>
    </header>
  );
}
