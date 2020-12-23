import React, { useState, useEffect } from "react";
// import "./appearance.css";
import "./appearance.css";
import UploadImage from "../ImageUpload/imageUpload";

import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Color1 from "../../../Assets/WhiteTheme.png";
import Color2 from "../../../Assets/BlackTheme.png";
import Color3 from "../../../Assets/GreyTheme.png";
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
// import { LazyLoadImage } from "react-lazy-load-image-component";

// import  from 'bootstrap'
const Appearance = () => {
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const [username, setUsername] = useState();
  const [themeColor, setThemeColor] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const selectorImage = useSelector((state) => state.imageUrl);
  const [disableButton, setDisableButton] = useState(true);

  const forceUpdate = React.useState()[1].bind(null, {});

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

  useEffect(() => {
    // forceUpdate();

    // if (selectorImage) {
    //   setLoading(false);
    //   // setDisableButton(false);
    // }
    // else if (URL || selectorImage) {
    //   setLoading(true);
    // }

    var user = firebaseApp.auth().currentUser;
    if (user) {
      storage
        .ref(user.email)
        .child("ProfileImage")
        .child("ProfileImage.jpg")
        .getDownloadURL()
        .then((url) => {
          setURL(url);
          setDisableButton(false);
          // if (url) {
          //   dispatch(ImageUrlAction(url));
          // }
        })
        .catch(() => {
          console.log("Error while fetching image");
        });
    }
  });

  // useEffect(() => {
  //   storage
  //     .ref(username)
  //     .child("ProfileImage")
  //     .child("ProfileImage.jpg")
  //     .getDownloadURL()
  //     .then((url) => {
  //       // setURL("");
  //       setURL(url);
  //       setLoading(false);

  //       // console.log("URL", url);
  //     });

  //   // else {
  //   //   setLoading(true);
  //   // }
  // }, [username, selectorImage]);

  useEffect(() => {}, [username, URL]);

  const clickHandler = (e) => {
    const getImageimage = e.target.files[0];
    // console.log("getImageimage", getImageimage);
    if (getImageimage) {
      storage
        .ref(`${username}/ProfileImage/ProfileImage.jpg`)
        .put(getImageimage)
        .then(() => {
          // setLoading(true);
          setDisableButton(false);
        });

      setImage(getImageimage);
    }
  };

  const clickRemoveImageHandler = () => {
    setDisableButton(false);
    storage
      .ref(username)
      .child("ProfileImage")
      .child("ProfileImage.jpg")
      .delete()
      .then(() => {
        dispatch(ImageUrlAction(""));
        setLoading(false);

        // forceUpdate();
        setURL("");
        console.log("Image deleted in firebase");
      })
      .catch(() => {
        console.log("ERROR Deleting image");
      });
  };

  // useEffect(() => {
  //   if (selectorImage) {
  //     setLoading(false);
  //   }

  // }, [selectorImage]);

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

  return (
    <div className="appearance">
      <div className="heading col-md-6">
        <h3>Profile</h3>
      </div>
      <div className="row">
        <div className="profile col-xs-12">
          <div className="info row">
            <div className="col-xs col-lg">
              {loading ? (
                <ReactLoading spin={loading} />
              ) : selectorImage || URL ? (
                // {URL ? (
                <>
                  <img
                    className="avatar"
                    style={{
                      width: "120px",
                      height: "100px",
                      border: "1px solid #d8d7de",
                      borderRadius: "100px",
                      // backgroundColor: "lightgreen",
                    }}
                    src={selectorImage || URL}
                    // src={URL}
                    alt={Avatar}
                    // src={selectorImage}
                  />
                </>
              ) : (
                <>
                  {/* <p> {console.log("image", image)}</p>
                  <p> {console.log("URL", URL)}</p> */}
                  <Avatar
                    className="avatar"
                    style={{
                      width: "120px",
                      height: "100px",
                      backgroundColor: "lightgreen",
                      border: "1px solid #d8d7de",
                      borderRadius: "100px",
                    }}
                  />
                </>
              )}
            </div>

            <div className="buttons buttonss col-xs col-lg">
              <input
                // style={{ width: "100px" }}
                id="fileUpload"
                style={{
                  width: "250px",
                  display: "none",
                }}
                type="file"
                // onChange={changeHandler}
                onChange={clickHandler}
              />
              <label
                for="fileUpload"
                // onClick={() => {
                //   clickHandler("imageUpload");

                // }}

                className="imageUploadButton"

                // variant="contained"
                // color="primary"
              >
                {/* PICK AN IMAGE */}
                Pick an image
              </label>
            </div>
            <div className="buttons col-xs col-lg">
              <button
                onClick={clickRemoveImageHandler}
                // style={{
                //   marginTop: "30px",
                //   maxWidth: "400px",
                //   maxHeight: "70px",
                //   minWidth: "250px",
                //   minHeight: "30px",
                //   marginTop: "0%",
                //   // borderRadius: "10px",
                // }}
                className="clearButton"
                disabled={disableButton}
              >
                Remove
              </button>
              {/* <Button
                onClick={clickRemoveImageHandler}
                
                style={{
                  marginTop: "30px",
                  maxWidth: "400px",
                  maxHeight: "70px",
                  minWidth: "250px",
                  minHeight: "30px",
                  marginTop: "0%",
                  // borderRadius: "10px",
                }}
                className="clearButton"
                variant="contained"
              >
                Remove
              </Button> */}
              <p>{/* <span className="load-bar">{progress}</span> */}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="heading_themes">
        <h3>Themes</h3>
      </div>
      <div className="themes">
        <div className="row pt-2 pl-2 content">
          <div className="col col-xs">
            <img
              src={Color1}
              onClick={() => {
                themeClickHandler("white", "grey");
              }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
            <br></br>
          </div>
          <div className="col col-xs">
            <img
              src={Color2}
              onClick={() => {
                themeClickHandler("#242322", "white");
              }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
          </div>
          <div className="col col-xs">
            <img
              src={Color3}
              onClick={() => {
                themeClickHandler("dimgray", "white");
              }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
