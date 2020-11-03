import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import classes from '../sidenavbar/SideNavBar.module.css';
import {Avatar} from '@material-ui/core';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';

const SideNavBar = () =>{
    return (
        <div className={classes.sidenavbar}>
            <AnnouncementOutlinedIcon/>
            <div className={classes.sidenavbar_buttom}>
                <MessageOutlinedIcon/>
                <NotificationsActiveOutlinedIcon/>
                <Avatar/>
            </div>
        </div>
    );
}

export default SideNavBar;