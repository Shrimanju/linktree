import React, { useState, useEffect } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "../LinkContainer/LinkContainer.module.css";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Switch from "react-switch";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import db, { auth } from "../../../Firebase_config/firebase";

const LinkContainer = (props) => {
  const [links, setlinks] = useState([]);

  const [checked, setChecked] = useState();

  const [title, setTitle] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("links")
      .onSnapshot((snapshot) =>
        setlinks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const titlehandler = (event) => {
    setTitle(event.target.value);
  };

  const urlhandler = (event) => {
    setUrl(event.target.value);
  };

  const handleChange = (checked) => {
    if (props.title && props.url) {
      if (checked) {
        setChecked(true);
        db.collection("users")
          .doc(auth.currentUser.uid)
          .collection("links")
          .doc(props.id)
          .update({
            isactive: true,
          });
      } else {
        setChecked(false);
        db.collection("users")
          .doc(auth.currentUser.uid)
          .collection("links")
          .doc(props.id)
          .update({
            isactive: false,
          });
      }
    } else {
      if (title && url) {
        if (checked) {
          let match = false;
          links.map((link) => {
            if (
              link.data.id === props.id &&
              link.data.title === title &&
              link.data.url === url
            ) {
              match = true;
              setChecked(true);
            }
          });
          if (match === false) {
            setChecked(true);
            props.linkData(title, url, props.id, props.timestamp, checked);
          }
        } else {
          setChecked(false);
          db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("links")
            .doc(props.id)
            .update({
              isactive: false,
            });
        }
      } else {
        if (title) {
          alert("Please Enter Url");
          setChecked(false);
        } else {
          alert("Please Enter Title");
          setChecked(false);
        }
      }
    }
  };

  return (
    <div className={classes.linkcontainer}>
      <div className={classes.drag_drop}>
        <DragIndicatorIcon />
      </div>
      <div className={classes.link_body}>
        <div className={classes.title}>
          <input
            type="text"
            value={props.title}
            placeholder="Enter Title &#xf044;"
            style={{ fontFamily: "FontAwesome", fontWeight: "bold" }}
            onChange={titlehandler}
          />
          <Switch
            onChange={handleChange}
            checked={props.isactive ? props.isactive : checked}
          />
        </div>

        <div className={classes.url}>
          <input
            type="text"
            value={props.url}
            placeholder="Enter Url &#xf044;"
            style={{ fontFamily: "FontAwesome" }}
            onChange={urlhandler}
          />
        </div>

        <div className={classes.icons}>
          <IconButton
            className={classes.iconbtn}
            onClick={() => {
              props.onDelete(props.id);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default LinkContainer;
