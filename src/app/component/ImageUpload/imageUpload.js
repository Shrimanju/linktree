import React, { useState, useEffect } from "react";
import {
  firebaseApp,
  storage,
  database,
} from "../../../Firebase_config/firebase";
import ReactLoading from "../ImageLoader/spinner";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";

const ImageUpload = (props) => {
  const [URL, setURL] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const selectorImage = useSelector((state) => state.imageUrl);

  useEffect(() => {
    if (props.upload) {
      storage
        .ref(`${props.username}/ProfileImage/ProfileImage.jpg`)
        .put(props.getImage)
        .then(() => {
          setLoading(true);
        });

      setImage(props.getImage);
    } else if (props.remove) {
    }
  });

  return (
    <div>
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
  );
};

export default ImageUpload;
