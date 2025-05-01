import React from "react";
import { NavLink } from "react-router";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/"
            className="sidebar-link"
            exact="true"
          >
            <i className="fas fa-home"></i> Panel glowny
          </NavLink>
        </li>
        <li>
          <NavLink to="/studenci" className="sidebar-link">
            <i className="fas fa-users"></i> Studenci
          </NavLink>
        </li>
        <li>
          <NavLink to="/plany" className="sidebar-link">
            <i className="fas fa-calendar-alt"></i> Plany
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/przedmioty"
            className="sidebar-link"
          >
            <i className="fas fa-book"></i> Przedmioty
          </NavLink>
        </li>
        <li>
          <NavLink to="/kierunki" className="sidebar-link">
            <i className="fas fa-graduation-cap"></i>{" "}
            Kierunki
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wykladowcy"
            className="sidebar-link"
          >
            <i className="fas fa-chalkboard-teacher"></i>{" "}
            Wykładowcy
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
