import React, { useState, useEffect, useRef } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "../LinkContainer/LinkContainer.module.css";
// import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DragIndicatorIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import TodayIcon from '@material-ui/icons/Today';
import BarChartIcon from '@material-ui/icons/BarChart';
import EjectIcon from '@material-ui/icons/Eject';
import Switch from "react-switch";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import db, { auth } from "../../../Firebase_config/firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Accordion, Button } from "react-bootstrap";


// import Modal from 'react-modal'

const LinkContainer = (props) => {
  const [links, setlinks] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [modalIsOpen1, setmodalIsOpen1] = useState(false);
  const [modalIsOpen2, setmodalIsOpen2] = useState(false);
  const [modalIsOpen3, setmodalIsOpen3] = useState(false);
  const [modalIsOpen4, setmodalIsOpen4] = useState(false);
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

              className={classes.iconbtnleft}
              onClick={() => {
                setmodalIsOpen(!modalIsOpen);
              }}
            
            >
              <EjectIcon />
            </IconButton>


            <IconButton
              className={classes.iconbtnleft}
              onClick={() => {
                setmodalIsOpen1(!modalIsOpen1);
              }}
            >
              <CropOriginalIcon />
            </IconButton>

            <IconButton
              className={classes.iconbtnleft}
              onClick={() => {
                setmodalIsOpen2(!modalIsOpen2);
              }}
            >
              <StarOutlineIcon />
            </IconButton>

            <IconButton
              className={classes.iconbtnleft}
              onClick={() => {
                setmodalIsOpen3(!modalIsOpen3);
              }}
            >
              <TodayIcon />
            </IconButton>

            <IconButton
              className={classes.iconbtnleft}
              onClick={() => {
                setmodalIsOpen4(!modalIsOpen4);
              }}
            >
              <BarChartIcon />
            </IconButton>

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
        <div>
          {
            modalIsOpen ?
              <div>

                <Card className={classes.card}>
                  <Card.Header>
                    <div className={classes.panelheader}>

                      <h5 className={classes.panelheadeheading}>Leap Link?</h5>
                      <a
                        className={classes.panelheadebutton}
                        onClick={() => { setmodalIsOpen(!modalIsOpen); }}
                      >   X
                        </a>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className={classes.cardtext}>
                      With Linktree PRO you can opt to temporarily forward all visitors directly to a destination,<br/> bypassing your Linktree altogether.
    </Card.Text>
                    <Button className={classes.cardbutton}>Find out more</Button>
                  </Card.Body>
                </Card>
              </div>
              : null
          }
        </div>
        <div>
          {
            modalIsOpen1 ?
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
                    <Card.Text className={classes.cardtext}>
                    With Linktree PRO you can add a thumbnail to your links.
    </Card.Text>
                    <Button className={classes.cardbutton}>Find out more</Button>
                  </Card.Body>
                </Card>
              </div>
              : null
          }
        </div>
        <div>
          {
            modalIsOpen2 ?
              <div>

                <Card className={classes.card}>
                  <Card.Header>
                    <div className={classes.panelheader}>

                      <h5 className={classes.panelheadeheading}>Priority Link</h5>
                      <a
                        className={classes.panelheadebutton}
                        onClick={() => { setmodalIsOpen2(!modalIsOpen2); }}
                      >   X
                        </a>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className={classes.cardtext}>
                    With Linktree PRO you can highlight your most important links with priority links.
    </Card.Text>
                    <Button className={classes.cardbutton}>Find out more</Button>
                  </Card.Body>
                </Card>
              </div>

              : null
          }
        </div>
        <div>
          {
            modalIsOpen3 ?
              <div>

                <Card className={classes.card}>
                  <Card.Header>
                    <div className={classes.panelheader}>

                      <h5 className={classes.panelheadeheading}>Schedule Link</h5>
                      <a
                        className={classes.panelheadebutton}
                        onClick={() => { setmodalIsOpen3(!modalIsOpen3); }}
                      >   X
                        </a>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className={classes.cardtext}>
                    With Linktree PRO you can schedule when your links go live.
    </Card.Text>
                    <Button className={classes.cardbutton}>Find out more</Button>
                  </Card.Body>
                </Card>
              </div>
              : null
          }
        </div>
        <div>
          {
            modalIsOpen4 ?
              <div>

                <Card className={classes.card}>
                  <Card.Header>
                    <div className={classes.panelheader}>

                      <h5 className={classes.panelheadeheading}>Link Analytics</h5>
                      <a
                        className={classes.panelheadebutton}
                        onClick={() => { setmodalIsOpen4(!modalIsOpen4); }}
                      >   X
                        </a>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className={classes.cardtext}>
                    <p className={classes.p}>This link has been clicked 0 times.</p>
                    <p className={classes.p}>More analytics available in <a href="">PRO.</a></p>
    </Card.Text>
                    <Button className={classes.cardbutton1}>Signup for PRO </Button >
                  </Card.Body>
                </Card>
              </div>
              : null
          }

        </div>
      </div>
    </div>
  );
};

export default LinkContainer;