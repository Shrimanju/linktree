import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Menu/Menu.module.css';

const Menu = () =>{
    return(
        <div className={classes.menucontainer}>
            <NavLink exact activeClassName={classes.activeclass} to='/'>Link</NavLink>
            <NavLink exact activeClassName={classes.activeclass} to='/appearance'>Appearance</NavLink>
            <NavLink exact activeClassName={classes.activeclass} to='/settings'>Settings</NavLink>
        </div>
    );
}

export default Menu;