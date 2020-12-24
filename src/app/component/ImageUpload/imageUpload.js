import React, { useState, useEffect } from "react";

import {
  firebaseApp,
  storage,
  database,
} from "../../../Firebase_config/firebase";
import ReactLoading from "../ImageLoader/spinner";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import db, { auth } from "../../../Firebase_config/firebase";
import ReactCropImage from "../CropImage/cropImage";
import { ImageUrlAction } from "../../Redux/Action/ActionFile";

const ImageUpload = (props) => {
  const [URL, setURL] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [cropImage, setCropImage] = useState("");
  const [username, setUsername] = useState();

  const selectorImage = useSelector((state) => state.imageUrl);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("props.getImage");
    // setImage(props.getImage);
    firebaseApp.auth().onAuthStateChanged((user1) => {
      db.collection("users")
        .doc(user1.uid)
        .collection("imageURL")
        .doc("url")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            // setColor(doc.data());
            setURL(doc.data().URL);
            setLoading(false);
            dispatch(ImageUrlAction(doc.data().URL));
            if (props.disableRemoveButton) {
              props.disableRemoveButton(false);
            }
          } else {
            setLoading(false);

            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error in getting URL:", error);
        });
    });
  }, []);

  useEffect(() => {
    console.log("Image");
  }, [image]);

  useEffect(() => {
    if (cropImage) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("imageURL")
        .doc("url")
        .set({
          URL: cropImage,
        })
        .then(() => {
          setLoading(false);

          props.disableRemoveButton(false);
        })
        .catch((err) => {
          console.log("err while setting image");
        });
    }

    // .ref(`${username}/ProfileImage/ProfileImage.jpg`)
  }, [cropImage]);

  return (
    <div key={props.getImage}>
      <div>
        {selectorImage || (URL && cropImage) ? (
          <>
            <img
              className="avatar"
              style={{
                width: props.width,
                height: props.height,
                border: "1px solid #d8d7de",
                borderRadius: "100px",
                //   // backgroundColor: "lightgreen",
              }}
              src={selectorImage || URL}
              // src={URL}
              // alt={Avatar}
              // src={selectorImage}
            />
          </>
        ) : loading && !URL ? (
          <ReactLoading spin={loading} />
        ) : (
          <>
            {/* <p> {console.log("image", image)}</p>
                  <p> {console.log("URL", URL)}</p> */}
            <Avatar
              className="avatar"
              style={{
                width: props.width,
                height: props.height,
                border: "1px solid #d8d7de",
                borderRadius: "100px",
                backgroundColor: "lightgreen",
              }}
            />
          </>
        )}
      </div>
      {props.getImage ? (
        <ReactCropImage
          imageFile={props.getImage}
          onOpen={true}
          getImageURL={(imageURL) => {
            setCropImage(imageURL);
          }}
        />
      ) : null}
    </div>
  );
};

export default ImageUpload;
