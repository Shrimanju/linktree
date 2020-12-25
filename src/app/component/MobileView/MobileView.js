import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "../MobileView/MobileView.module.css";
import MobileContainer from "./MobileContainer/MobileContainer";
import db, { auth } from "../../../Firebase_config/firebase";
import ShareLinkPopOver from "../Account_PopOver/AccountPopover";
import { Base_URL } from "../../../utils/index";
const MobileView = () => {
  const { mylinkid } = useParams();
  const [username, setUsername] = useState();
  const [userError, setUserError] = useState();
  const [databaseError, setDatabaseError] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsername(doc.data().name);
        } else {
          setUserError("No such information present");
        }
      })
      .catch((error) => {
        setDatabaseError(error);
      });
  }, []);

  const popoverOpen = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };

  //   useEffect(() => {
  //     alert("a", anchorEl);
  //   }, [anchorEl]);

  const popoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //   const clickHandler = () => {
  //     console.log("Share button is cliked");
  //   };

  return (
    <div className={classes.container}>
      <div className={classes.mobileheader}>
        <span>
          <span className={classes.mylink}>My Link:</span>
          <Link to={`/${username}`} className={classes.link}>
            <span style={{ marginLeft: "5%" }}>
              {" "}
              {`${Base_URL}/${username}`}
            </span>
          </Link>
        
        </span>
        <button
        className={classes.sharebutton}
          onClick={popoverOpen}
        >
          Share
        </button>
        <ShareLinkPopOver
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={popoverClose}
          element="shareLink"
        />
      </div>
      <div className={classes.mobilebody}>
        <MobileContainer user={username} />
      </div>
    </div>
  );
};

export default MobileView;
