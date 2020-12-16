import React, { useState, useEffect } from "react";
// import "./appearance.css";
import "./appearance.css";

import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Color1 from "../../../Assets/WhiteTheme.png";
import Color2 from "../../../Assets/BlackTheme.png";
import Color3 from "../../../Assets/GreyTheme.png";
import { storage, database } from "../../../Firebase_config/firebase";
import db, { auth } from "../../../Firebase_config/firebase";
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";
import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";
import { ImageUrlAction } from "../../Redux/Action/ActionFile";
import { useSelector, useDispatch } from "react-redux";

import ls from "local-storage";
// import  from 'bootstrap'
const Appearance = () => {
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const [username, setUsername] = useState();
  const [themeColor, setThemeColor] = useState("");
  const dispatch = useDispatch();
  const selectorImage = useSelector((state) => state.imageUrl);

  // console.log(selector);

  if (ls.get("ArrayOfImageDetails")) {
    var ArrayOfImageDetails = [];
  }

  useEffect(() => {
    setTimeout(() => {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().email);
          } else {
            console.log("Error in document");
          }
        });
    }, 2000);
  }, []);

  // useEffect(() => {
  storage
    .ref(username)
    .child("ProfileImage")
    .child("ProfileImage.jpg")
    .getDownloadURL()
    .then((url) => {
      setURL("");
      setURL(url);

      console.log("URL", url);
    });
  // }, [username]);

  useEffect(() => {
    if (URL) {
      dispatch(ImageUrlAction(URL));
    }
  }, [username, URL]);

  const changeHandler = (e) => {
    const getImageimage = e.target.value;
    console.log("getImageimage", getImageimage);

    setImage(getImageimage);
  };

  useEffect(() => {
    if (image && username) {
      console.log("Image", image);
      clickHandler("imageUpload", image);
    }
  }, [image]);

  const clickHandler = (e, data, image) => {
    if (data == "imageUpload" && image != "") {
      console.log("image", image);
      console.log("Username", username);

      const key = database.ref().child(auth.currentUser.uid).push().key;

      const uploadImage = storage
        .ref(`${username}/ProfileImage/ProfileImage.jpg`)
        .put(image);

      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(username)
            .child("ProfileImage")
            .child("ProfileImage.jpg")
            .getDownloadURL()
            .then((url) => {
              setURL(url);
            });
        }
      );
    } else if (data === "imageRemove") {
      console.log("data", data);

      storage.ref(`${username}/ProfileImage/ProfileImage.jpg`).delete();

      // .child("ProfileImage")
      // .child("ProfileImage.jpg")

      setURL("");
    }
  };

  const themeClickHandler = (color) => {
    setThemeColor(color);

    var themeColorObject = {
      email: username,
      themeColor: color,
    };
    var themeColorDetails = ls.get("themeColorObject") || [];

    if (!ls.get("themeColorObject")) {
      console.log("themeColorObject1", themeColorObject);
      ls.set("themeColorObject", [themeColorObject]);
    } else if (
      ls.get("themeColorObject") &&
      themeColorDetails.filter((getUsername) => getUsername.email === username)
        .length >= 1
    ) {
      themeColorDetails.map((userDetails, index) => {
        // console.log("userDetails", userDetails);
        if (userDetails.email === username) {
          console.log("themeColorObject2", themeColorObject);

          // console.log("getDetails[index].imageName", [
          //   getDetails[index].imageName,
          // ]);

          themeColorDetails[index].themeColor = themeColorObject.themeColor;

          ls.set("themeColorObject", themeColorDetails);

          // console.log("getDetails", getDetails);
        }
      });
    } else if (
      themeColorDetails.filter((getUsername) => getUsername.email === username)
        .length === 0
    ) {
      console.log("themeColorObject3", themeColorObject);

      ls.set("themeColorObject", [
        ...ls.get("themeColorObject"),
        themeColorObject,
      ]);
    }

    // dispatch(getColorForThemeAction(color));
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
              {selectorImage || URL ? (
                <>
                  {/* <p> {console.log("image", image)}</p>
                  <p> {console.log("URL", URL)}</p> */}
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
                onChange={changeHandler}
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
                PICK AN IMAGE
              </label>
            </div>
            <div className="buttons col-xs col-lg">
              <Button
                onClick={() => {
                  clickHandler("imageRemove");
                }}
                style={{
                  marginTop: "30px",
                  maxWidth: "400px",
                  maxHeight: "70px",
                  minWidth: "250px",
                  minHeight: "30px",
                  marginTop: "0%",
                  // borderRadius: "10px",
                }}
                variant="contained"
              >
                Remove
              </Button>
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
                themeClickHandler("white");
              }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
            <br></br>
          </div>
          <div className="col col-xs">
            <img
              src={Color2}
              onClick={() => {
                themeClickHandler("#242322");
              }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
          </div>
          <div className="col col-xs">
            <img
              src={Color3}
              onClick={() => {
                themeClickHandler("dimgray");
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
