import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Menu/Menu.module.css';

const Menu = () =>{
    return(
        <div className={classes.menucontainer}>
            <NavLink exact activeClassName={classes.activeclass} to='/admin'>Link</NavLink>
            <NavLink exact activeClassName={classes.activeclass} to='/admin/appearance'>Appearance</NavLink>
            <NavLink exact activeClassName={classes.activeclass} to='/admin/settings'>Settings</NavLink>
        </div>
    );
}

export default Menu;