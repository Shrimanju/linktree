import React, { useState, useEffect, useRef } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "../LinkContainer/LinkContainer.module.css";
// import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DragIndicatorIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import TodayIcon from "@material-ui/icons/Today";
import BarChartIcon from "@material-ui/icons/BarChart";
import EjectIcon from "@material-ui/icons/Eject";
import Switch from "react-switch";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import db, { auth } from "../../../Firebase_config/firebase";
import { Avatar } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Accordion, Button } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Thumbcards from "../thumbnailcard/thumbnailcard";
import Schedulelink from "../schedulelink/schedulelink";

// import Modal from 'react-modal'

const LinkContainer = (props) => {
  const [links, setlinks] = useState([]);
  const [modalIsOpen1, setmodalIsOpen1] = useState(false);
  // const [modalIsOpen3, setmodalIsOpen3] = useState(false);
  const [checked, setChecked] = useState();
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [myProfession, setMyProfession] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
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
              // isactive: false,
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
            id="text"
            type="text"
            value={props.title}
            placeholder="Enter Title &#xf044;"
            style={{ fontFamily: "FontAwesome", fontWeight: "bold" }}
            onChange={titlehandler}
          />
          <Switch
            onChange={handleChange}
            checked={props.isactive ? props.isactive : checked}
            checkedIcon={false}
            uncheckedIcon={false}
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
        <div className={classes.iconsbottom}>
          <div className={classes.iconsleft}>
            <IconButton
              className={classes.iconbtnleft1}
              onClick={() => {
                setmodalIsOpen1("thumb");
              }}
            //   onClick={() => {
            //  props.toggleme('thumb')
            //   }}
            >
              <span className={classes.tooltiptext}>Thumbnail</span>
              <CropOriginalIcon />
            </IconButton>

            <IconButton
              className={classes.iconbtnleft1}
              // onClick={() => {
              //   setmodalIsOpen1(!modalIsOpen1);
              // }}
              onClick={() => {
                setmodalIsOpen1("schedule");
              }}
            >
              <span className={classes.tooltiptext}>Schedule</span>
              <TodayIcon />
            </IconButton>

            <IconButton
              className={classes.iconbtnleft1}
              onClick={() => {
                setmodalIsOpen1(!modalIsOpen1);
              }}
            >
              <span className={classes.tooltiptext}>Edit</span>
              <EditIcon />
            </IconButton>
            <IconButton
              className={classes.iconbtnleft1}
              onClick={() => {
                props.onDelete(props.id);
              }}
            >
              <span className={classes.tooltiptext}>Delete</span>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
        </div>
<div>
        {modalIsOpen1 === "thumb" && (
                        <div>
  <Card className={classes.card}>
                  <Card.Header>
                    <div className={classes.panelheader}>


                      <h5 className={classes.panelheadeheading}>Add Thumbnail</h5>
                      <a
                        className={classes.panelheadebutton}
                        onClick={() => { setmodalIsOpen1(!modalIsOpen1); }}
                      >   X
                        </a>
                    </div>
                  </Card.Header>
                  <Card.Body>
                   < Thumbcards/>

                  </Card.Body>
                </Card>
                          </div>
                        )}
                        {modalIsOpen1 === "schedule" && (
                         <div>

                         <Card className={classes.card}>
                           <Card.Header>
                             <div className={classes.panelheader}>
         
                               <h5 className={classes.panelheadeheading}>Schedule Link</h5>
                               <a
                                 className={classes.panelheadebutton}
                                 onClick={() => { setmodalIsOpen1(!modalIsOpen1); }}
                               >   X
                                 </a>
                             </div>
                           </Card.Header>
                           <Card.Body>
         <Schedulelink/>
                           </Card.Body>
                         </Card>
                       </div>
                        )}

</div>
      
        
      </div>
    </div>
  );
};

export default LinkContainer;
