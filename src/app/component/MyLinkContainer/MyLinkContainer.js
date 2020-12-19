import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import classes from "../MyLinkContainer/MyLinkContainer.module.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import db, { auth } from "../../../Firebase_config/firebase";
import ls from "local-storage";

// import db, { auth } from "../../Firebase_config/firebase";

function MyLinkContainer(props) {
  const [username, setUsername] = useState();
  const [URL, setURL] = useState("");
  const [links, setlinks] = useState([]);

  setInterval(() => {
    var getURLFromLocalStorage = ls.get("ArrayOfImageDetails") || "";

    // console.log("getURLFromLocalStorage", getURLFromLocalStorage);
    if (getURLFromLocalStorage) {
      getURLFromLocalStorage.map((userImage) => {
        if (userImage.email === username) {
          // console.log("URL", userImage.url);
          setURL(userImage.url);
        }
      });
    }
    // console.log(
    //   "local storage outside useEffect",
    //   localStorage.getItem("themeColor")
    // );
  }, 2000);

  useEffect(() => {
    // alert(props.url);

    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsername(doc.data().name);
        } else {
          console.log("Error in document");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("links")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setlinks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={classes.MyLinkContainer}>
      <a
        className="btn btn-outline-success w-100 p-3"
        href={props.url}
        role="button"
        target="_blank"
      >
        {props.title}
      </a>
    </div>
  );
}

export default MyLinkContainer;
