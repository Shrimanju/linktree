import React, { useState, useEffect } from "react";
// import "./appearance.css";
import "./appearance.css";

import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Color1 from "../../../Assets/color1.PNG";
import Color2 from "../../../Assets/color2.PNG";
import Color3 from "../../../Assets/color3.PNG";
import { storage, database } from "../../../Firebase_config/firebase";
import db, { auth } from "../../../Firebase_config/firebase";
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";
import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";

// import  from 'bootstrap'
const Appearance = () => {
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const [username, setUsername] = useState();

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
      storage
        .ref(username)
        .listAll()
        .then((imageList) => {
          imageList.items.map((imageList) => {
            console.log("imageList", imageList.fullPath);
            fullPath = imageList.fullPath.split("/");
            console.log(fullPath[0]);
            console.log(fullPath[1]);

            storage.ref().child(fullPath[0]).child(fullPath[1]).delete();
          });
        });
      const key = database.ref().child(auth.currentUser.uid).push().key;

      const uploadImage = storage.ref(`${username}/${image.name}`).put(image);

      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(username)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setURL(url);
              console.log("url", url);
            });
        }
      );
    } else if (data === "imageRemove") {
      storage.ref().child(username).child(image.name).delete();
      setURL("");
    }
  };

  return (
    <div>
      <div className="heading col-md-6">
        <h3>Profile</h3>
      </div>
      <div className="row">
        <div className="profile col-xs-12">
          <div className="info row">
            <div className="col-xs col-lg">
              {URL ? (
                <>
                  <p> {console.log("image", image)}</p>
                  <p> {console.log("URL", URL)}</p>
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
                  <p> {console.log("image", image)}</p>
                  <p> {console.log("URL", URL)}</p>
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
                type="file"
                onChange={changeHandler}
              />
              <Button
                onClick={() => {
                  clickHandler("imageUpload");
                }}
                style={{
                  maxWidth: "400px",
                  maxHeight: "70px",
                  minWidth: "250px",
                  minHeight: "30px",
                  borderRadius: "50px",
                }}
                variant="contained"
                color="primary"
              >
                Pick an Image
              </Button>
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
              // onClick={() => {
              //   themeClickHandler("blue");
              // }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
            <br></br>
          </div>
          <div className="col col-xs">
            <img
              src={Color2}
              // onClick={() => {
              //   themeClickHandler("pink");
              // }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
          </div>
          <div className="col col-xs">
            <img
              src={Color3}
              // onClick={() => {
              //   themeClickHandler("violet");
              // }}
              style={{ width: "200px", height: "300px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
