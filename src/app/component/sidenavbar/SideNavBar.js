import React, { useState } from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import classes from '../sidenavbar/SideNavBar.module.css';
import {Avatar, IconButton} from '@material-ui/core';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import { auth } from '../../../Firebase_config/firebase';
import AccountPopover from '../Account_PopOver/AccountPopover';

const SideNavBar = () =>{

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.sidenavbar}>
            <AnnouncementOutlinedIcon/>
            <div className={classes.sidenavbar_buttom}>
                <MessageOutlinedIcon/>
                <NotificationsActiveOutlinedIcon/>
                <IconButton aria-describedby={id} onClick={handleClick }>
                    <Avatar />
                </IconButton>
                <AccountPopover id = {id} open= {open} anchorEl={anchorEl} handleClose={handleClose} />
            </div>
        </div>
    );
}

export default SideNavBar;