import React from "react";
import Link from "../../pages/links";
import Appearance from "../Apperance/appearance";
import Settings from "../../pages/settings";
import Menu from "../Menu/Menu";
import classes from "../topnavbar/TopNavBar.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const TopNavBar = () => {
  return (
    <div className={classes.topnavbar}>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path="/" component={Link} />
          <Route exact path="/appearance" component={Appearance} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default TopNavBar;
