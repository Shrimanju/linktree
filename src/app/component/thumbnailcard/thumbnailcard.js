// import React, { useState, useEffect, useRef } from "react";
// import Class1 from "../thumbnailcard/thumbnailcard.css";
// import './thumbnailcard.css';
// import { Avatar } from "@material-ui/core";
// import { Container, Card, Accordion, Button } from "react-bootstrap";


// const Thumbcard = () => {


//   return (
    // <div className="thumba">
    //                 <div  className="avatar">
    //               <Avatar
                 
    //                 style={{
    //                   width: "100px",
    //                   height: "100px",
    //                   backgroundColor: "#000000",
    //                   border: "1px solid #d8d7de",
    //                   borderRadius: "100px",
    //                 }}
    //               />
    //               </div>
    //               <div className="thumbnail">
    //                 <Button style={{ backgroundColor: "lightgreen", }}
    //                  className="thumbnailbutton"
    //                 >
    //                   Upload Image
    //                   </Button>

    //                   <Button style={{ backgroundColor: "#FF0000", }}
    //                 className="thumbnailbutton">
    //                   Remove Image
    //                   </Button>

    //                   </div>
                 
//     </div>
//   );
// };

// export default Thumbcard;




import React, { useState, useEffect } from "react";
import "./thumbnailcard.css";
import UploadImage from "../ImageUpload/imageUpload";

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
import ReactCropImage from "../CropImage/cropImage";
import ImageUploadWithCrop from './thumbimageupload';
import { CreateCustomTheme } from "../CustomTheme/customTheme";
const Thumbcard = () => {
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

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user1) => {
      db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("links")
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
  }, [image]);

  useEffect(() => {
    if (cropImage) {
      db.collection("users")
      .doc(auth.currentUser.uid)
        .collection("thumbnail")
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
  
  return (
    
    <div className="appearance1">


<div className="thumba">
          <div  className="avatar">
              <ImageUploadWithCrop
                getImage={image}
                disableLoading={disableButton}
                disableRemoveButton={(enable) => {
                  setDisableButton(enable);
                }}
                width={"100px"}
                height={"100px"}
               
              />
            
            </div>
            <div className="thumbnail">
            <div className="buttons buttonss col-xs col-lg">
              <input
                id="fileUpload"
                style={{
                  display: "none",
                }}
                type="file"
                onChange={clickHandler}
              />
              <label
                for="fileUpload"
                className="imageUploadButton1"
              >
                Update Image
              </label>
            </div>
            <div className="buttons col-xs col-lg">
              <button
                onClick={clickRemoveImageHandler}
                className="clearButton1"
                disabled={disableButton}
              >
                Remove image
              </button>
            </div>
          </div>
        </div>
      </div>

  );
};

export default  Thumbcard;
