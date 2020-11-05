import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Menu/Menu.module.css';

const Menu = () =>{
    return(
        <div className={classes.menucontainer}>
            <NavLink exact activeClassName={classes.activeclass} className={classes.link} to='/'>Link</NavLink>
            <NavLink exact activeClassName={classes.activeclass} className={classes.link} to='/appearance'>Appearance</NavLink>
            <NavLink exact activeClassName={classes.activeclass} className={classes.link} to='/settings'>Settings</NavLink>
        </div>
    );
}

export default Menu;