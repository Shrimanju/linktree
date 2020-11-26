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

// import  from 'bootstrap'
const Appearance = () => {
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");

  useEffect(() => {
    // db.collection("users")
    //   .doc(auth.currentUser.uid)
    //   .collection("image")
    //   .onSnapshot((snapshot) => {
    //     setImage(
    //       snapshot.docs.map((doc) => ({
    //         // url: ,
    //         data: doc.data(),
    //       }))
    //     );
    //   });
  }, []);

  //   const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const changeHandler = (e) => {
    const getImageimage = e.target.files[0];
    setImage(getImageimage);
  };
  const clickHandler = (data) => {
    console.log("image", image);
    console.log(data);
    if (data == "imageUpload" && image != "") {
      //   const key = db.ref() .child(auth.currentUser.uid).push().key;
      const key = database.ref().child(auth.currentUser.uid).push().key;
      const uploadImage = storage
        .ref()
        .child(auth.currentUser.uid)
        .child(key)
        .put(image);
      //   const uploadImage = storage.ref(`images/${image.name}`).put(image); //put() upload image to firebase
      //   uploadImage.put(image);

      //   uploadImage.put(image).then((snap) => {
      //     database
      //       .ref()
      //       .child(auth.currentUser.uid)
      //       .child(key)
      //       .set(setURL(snap.metadata.downloadURLs[0]));
      //   });

      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setURL(url);
              console.log("url", url);
            });
        }
      );
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
              {image && URL ? (
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
                Pic an Image
              </Button>
            </div>
            <div className="buttons col-xs col-lg">
              <Button
                onChange={() => {
                  changeHandler("imageRemove");
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
            <img src={Color1} style={{ width: "200px", height: "300px" }} />
            <br></br>
          </div>
          <div className="col col-xs">
            <img src={Color2} style={{ width: "200px", height: "300px" }} />
          </div>
          <div className="col col-xs">
            <img src={Color3} style={{ width: "200px", height: "300px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
