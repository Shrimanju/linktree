import React, { useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "../sidenavbar/SideNavBar.module.css";
import { Avatar, IconButton } from "@material-ui/core";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import Logo from "../../../Assets/logo.png";
import AccountPopover from "../Account_PopOver/AccountPopover";
import ImageUploadWithCrop from "../ImageUpload/imageUpload";

const SideNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const popoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const popoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.sidenavbar}>
      {/* <AnnouncementOutlinedIcon className={classes.avatar} /> */}
      <img className={classes.logo} src={Logo} />

      {/* <div className={classes.}> */}
      <div className={classes.sidenavbar_buttom}>
        <MessageOutlinedIcon className={classes.icon} />
        <NotificationsActiveOutlinedIcon className={classes.icon} />
        <IconButton aria-describedby={id} onClick={popoverOpen}>
          {/* <Avatar className={classes.avatar} /> */}
          <ImageUploadWithCrop className={classes.avatar} />
        </IconButton>
        <AccountPopover
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={popoverClose}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default SideNavBar;
