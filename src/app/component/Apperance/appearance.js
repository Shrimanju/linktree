

import React, { useState, useEffect } from "react";
// import "./appearance.css";
import "./appearance.css";
import UploadImage from "../ImageUpload/imageUpload";
import Profile from '../profile/profile.js'
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Color1 from "../../../Assets/WhiteTheme1.png";
import Color2 from "../../../Assets/BlackTheme1.png";
import Color3 from "../../../Assets/GreyTheme1.png";

import db, { auth } from "../../../Firebase_config/firebase";
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";
import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";
import { ImageUrlAction } from "../../Redux/Action/ActionFile";
import { useSelector, useDispatch } from "react-redux";
import {
  firebaseApp,
  storage,
  database,
} from "../../../Firebase_config/firebase";
import firebase from "firebase";
import ls from "local-storage";
import { Check } from "@material-ui/icons";
import ReactLoading from "../ImageLoader/spinner";
// import ReactCropper from "react-cropper";
import ReactCropImage from "../CropImage/cropImage";
import ImageUploadWithCrop from "../ImageUpload/imageUpload";
import { CreateCustomTheme } from "../CustomTheme/customTheme";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import Editname from '../Editname/editname'
import Editbio from '../Editbio/editbio'
import Editnameandbio from '../Editnameandbio/editnameandbio'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { Container, Card, Accordion } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
const Appearance = () => {
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const [username, setUsername] = useState();
  const [themeColor, setThemeColor] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const selectorImage = useSelector((state) => state.imageUrl);
  const [disableButton, setDisableButton] = useState(true);
  const [cropImage, setCropImage] = useState("");
  // const forceUpdate = React.useState()[1].bind(null, {});
  const [imageDelete, setImageDeleted] = useState(false);
  const [userbio, setUserbio] = useState();



  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user1) => {
      db.collection("users")
        .doc(user1.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().email);
          } else {
            console.log("Error in document");
          }
        });
    });
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      console.log("Files", files);
    } else if (e.target) {
      files = e.target.files;
    }
    if (files[0] !== "undefined") {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }


  };

  useEffect(() => {
    // console.log("Image", image);
  }, [image]);

  useEffect(() => {
    if (cropImage) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("imageURL")
        .doc("url")
        .set({
          URL: cropImage,
        });
    }
  }, [cropImage]);

  const clickRemoveImageHandler = () => {
    setDisableButton(true);

    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("imageURL")
      .doc("url")
      .delete()
      .then(() => {
        dispatch(ImageUrlAction(""));

      })
      .catch(() => {
        console.log("ERROR Deleting image");
      });
  };

  const themeClickHandler = (backgroundColor, fontColor) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("themeColor")
      .doc("color")
      .set({
        bgColor: backgroundColor,
        fontColor: fontColor,
      });
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? 'simple-popover' : undefined;

  return (
    <div className="appearance">

      <div className="heading col-md-6">
        <h3>Profile</h3>
      </div>


<Profile/>



<div className="heading_themes">
        <h3>Themes</h3>
      </div>
      <div className="themes">
        <div className="row pt-2 pl-2 content">
          <div className="col col-xs-12">
            <CreateCustomTheme
              getThemeDetails={(bgColor, fontColor) => {
                themeClickHandler(bgColor, fontColor);
              }}
            />
          </div>
          <div className="col col-xs">
            <img
              src={Color1}
              onClick={() => {
                themeClickHandler("white", "grey");
              }}
              className="color1"
            />
            <br></br>
          </div>
          <div className="col col-xs">
            <img
              src={Color2}
              onClick={() => {
                themeClickHandler("#242322", "white");
              }}
              className="color1"
            // style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
          </div>
          <div className="col col-xs">
            <img
              src={Color3}
              onClick={() => {
                themeClickHandler("dimgray", "white");
              }}
              className="color1"
            // style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
