import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../Menu/Menu.module.css";

const Menu = () => {
  return (
    <div className={classes.menucontainer}>
      <NavLink
        to="/"
        activeClassName={classes.activeclass}
        className={classes.link}
      >
        Link
      </NavLink>
      <NavLink
        to="/appearance"
        activeClassName={classes.activeclass}
        className={classes.link}
      >
        Appearance
      </NavLink>
      <NavLink
        to="/settings"
        activeClassName={classes.activeclass}
        className={classes.link}
      >
        Settings
      </NavLink>
    </div>
  );
};

export default Menu;
