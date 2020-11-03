import React from 'react';
import Link from '../../pages/links';
import Appearance from '../../pages/appearance';
import Settings from '../../pages/settings';
import {Route,Switch} from 'react-router-dom';
import Menu from '../Menu/Menu';
import classes from '../topnavbar/TopNavBar.module.css';

const TopNavBar = () =>{
    return(
        <div className={classes.topnavbar}>
            <Menu />
            <Route exact path='/admin' component={Link} />
            <Route exact path='/admin/appearance' component={Appearance} />
            <Route exact path='/admin/settings' component={Settings} />
        </div>
    );
}

export default TopNavBar;