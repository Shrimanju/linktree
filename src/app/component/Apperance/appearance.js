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
// import getColorForThemeAction from "../../Redux/Action/getColorForThemeAction";
// import { useDispatch } from "react-redux";

import ls from "local-storage";
// import  from 'bootstrap'
const Appearance = () => {
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const [username, setUsername] = useState();
  const [themeColor, setThemeColor] = useState("");

  if (ls.get("ArrayOfImageDetails")) {
    var ArrayOfImageDetails = [];
  }
  // var getDetails = ls.get("ArrayOfImageDetails") || [];

  setInterval(() => {
    var getURLFromLocalStorage = ls.get("ArrayOfImageDetails") || "";

    // console.log("getURLFromLocalStorage", getURLFromLocalStorage);
    if (getURLFromLocalStorage) {
      getURLFromLocalStorage.map((userImage) => {
        if (userImage.email === username) {
          // console.log("URL", userImage.imageName);
          // setImage("image", image);
          setImage(userImage.imageName);
          setURL(userImage.url);
        }
      });
    }

    // setURL(getURLFromLocalStorage[0].url);
  }, 1000);

  useEffect(() => {
    // var path = storage.getPath;
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
      // if (URL === "") {
      // storage
      //   .ref(username)
      //   .listAll()
      //   .then((imageList) => {
      //     imageList.items.map((eachFile) => {
      //       console.log("eachFile", eachFile);
      //     });
      //   });
      // }
    }, 2000);
    // return () => {
    //   clearInterval(interval);
    // };

    // storage
    //   .ref("images")
    //   .listAll()
    //   .then((imageList) => {
    //     imageList.items.map((eachFile) => {
    //       console.log(
    //         "Image List",
    //         imageList.items.lastIndexOf(eachFile),
    //         eachFile
    //       );
    //     });
    //   });
  }, []);

  const changeHandler = (e) => {
    const getImageimage = e.target.files[0];
    setImage(getImageimage);
  };
  const clickHandler = (data) => {
    var fullPath = [];
    // console.log("image", image);
    // console.log(data);
    if (data == "imageUpload" && image != "") {
      // storage
      //   .ref(username)
      //   .listAll()
      //   .then((imageList) => {
      //     imageList.items.map((imageList) => {
      //       // console.log("imageList", imageList.fullPath);
      //       fullPath = imageList.fullPath.split("/");
      //       // console.log(fullPath[0]);
      //       // console.log(fullPath[1]);

      //       storage.ref().child(fullPath[0]).child(fullPath[1]).delete();
      //     });
      //   });
      const key = database.ref().child(auth.currentUser.uid).push().key;

      const uploadImage = storage
        .ref(`${username}/${image.name || image}`)
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
            .child(image.name || image)
            .getDownloadURL()
            .then((url) => {
              setURL(url);

              var imageDetails = {
                email: username,
                imageName: image.name,
                url: url,
              };

              var getDetails = ls.get("ArrayOfImageDetails") || [];
              console.log(
                "Filter of array",
                getDetails.filter(
                  (getUsername) => getUsername.email === username
                ).length === 0
              );

              if (!ls.get("ArrayOfImageDetails")) {
                console.log("ArrayOfImageDetails1", imageDetails);
                ls.set("ArrayOfImageDetails", [imageDetails]);
              } else if (
                ls.get("ArrayOfImageDetails") &&
                getDetails.filter(
                  (getUsername) => getUsername.email === username
                ).length >= 1
              ) {
                getDetails.map((userDetails, index) => {
                  // console.log("userDetails", userDetails);
                  if (userDetails.email === username) {
                    console.log("ArrayOfImageDetails2", imageDetails);

                    // console.log("getDetails[index].imageName", [
                    //   getDetails[index].imageName,
                    // ]);

                    getDetails[index].imageName = imageDetails.imageName;

                    ls.set("ArrayOfImageDetails", getDetails);

                    // console.log("getDetails", getDetails);
                  }
                });
              } else if (
                getDetails.filter(
                  (getUsername) => getUsername.email === username
                ).length === 0
              ) {
                console.log("ArrayOfImageDetails3", imageDetails);

                ls.set("ArrayOfImageDetails", [
                  ...ls.get("ArrayOfImageDetails"),
                  imageDetails,
                ]);
              }
              // else if ([getDetails[index].email].indexOf(username) == -1) {

              //              ls.set("ArrayOfImageDetails", ArrayOfImageDetails);

              // console.log("url", url);
            });
        }
      );
    } else if (data === "imageRemove") {
      console.log("data", data);

      var getDetails1 = ls.get("ArrayOfImageDetails") || [];

      var getIndex = getDetails1.findIndex((index) => index.email === username);
      console.log("Index", getIndex);

      if (getDetails1 && getIndex >= 0) {
        getDetails1.splice(getIndex, 1);
        ls.set("ArrayOfImageDetails", getDetails1);
      }

      // storage.ref().child(username).child(image.name).delete();
      // ls.remove("imageDetails");
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
              {URL ? (
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
                    src={URL}
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
                style={{ width: "100px" }}
                id="fileUpload"
                style={{
                  // width: "250px",
                  // border: "1px solid green",
                  display: "none",
                  // background: "orange",
                }}
                type="file"
                onChange={changeHandler}
              />
              <label
                // onClick={() => {
                //   clickHandler("imageUpload");
                // }}
                forHtml="fileUpload"
                style={{
                  maxWidth: "400px",
                  maxHeight: "70px",
                  minWidth: "250px",
                  minHeight: "30px",
                  borderRadius: "50px",
                  pointerEvents: "cursor",
                  background: "blue",
                  color: "white",
                  textAlign: "center",
                  // marginTop: "-20%",
                }}
                // variant="contained"
                // color="primary"
              >
                Pick an Image
              </label>
            </div>
            <div className="buttons col-xs col-lg">
              <Button
                // onClick={() => {
                //   clickHandler("imageRemove");
                // }}
                style={{
                  marginTop: "30px",
                  maxWidth: "400px",
                  maxHeight: "70px",
                  minWidth: "250px",
                  minHeight: "30px",
                  borderRadius: "50px",
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
