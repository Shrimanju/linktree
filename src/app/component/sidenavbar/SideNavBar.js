import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import classes from '../sidenavbar/SideNavBar.module.css';
import {Avatar, IconButton} from '@material-ui/core';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import { auth } from '../../../Firebase_config/firebase';

const SideNavBar = () =>{
    const logout=()=>{
        auth.signOut();
    }

    return (
        <div className={classes.sidenavbar}>
            <AnnouncementOutlinedIcon/>
            <div className={classes.sidenavbar_buttom}>
                <MessageOutlinedIcon/>
                <NotificationsActiveOutlinedIcon/>
                <IconButton onClick={logout}>
                    <Avatar />
                </IconButton>
            </div>
        </div>
    );
}

export default SideNavBar;