import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import classes from "../../styles/MyLink/Mylink.module.css";
import MyLinkContainer from "../component/MyLinkContainer/MyLinkContainer";
import db, { auth } from "../../Firebase_config/firebase";
import ls from "local-storage";
import { useSelector } from "react-redux";
// import { selectorImage } from "../../utils/index";
import { firebaseApp, storage, database } from "../../Firebase_config/firebase";
function Mylink() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [URL, setURL] = useState("");
  const [links, setlinks] = useState([]);
  const selectorImage = useSelector((state) => state.imageUrl);
  console.log("Image", selectorImage);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user1) => {
      console.log("user", user1.uid);

      db.collection("users")
        .doc(user1.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().name);
            setEmail(doc.data().email);
          } else {
            console.log("Error in document");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      const unsubscribe = db
        .collection("users")
        .doc(user1.uid)
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
    });
  }, []);

  useEffect(() => {
    // var user = firebaseApp.auth().currentUser;

    // console.log("Image", image);

    if (email) {
      storage
        .ref(email)
        .child("ProfileImage")
        .child("ProfileImage.jpg")
        .getDownloadURL()
        .then((url) => {
          setURL(url);

          console.log("URL", url);
        })
        .catch(() => {
          console.log("Error while fetching image");
        });
    }
  });

  return (
    <div className={classes.mylink_container}>
      <div className={classes.header}>
        {selectorImage || URL ? (
          // {URL ? (
          <>
            <img className={classes.link} src={selectorImage || URL} />
            {/* <img className={classes.link} src={URL} /> */}
          </>
        ) : (
          <>
            <Avatar className={classes.avatar} />
          </>
        )}
        <span>{username}</span>
      </div>
      <div className={classes.body}>
        {links.map((link) => {
          if (link.data.isactive === true) {
            return (
              <MyLinkContainer title={link.data.title} url={link.data.url} />
            );
          }
        })}
      </div>
      <div className={classes.footer}></div>
    </div>
  );
}

export default Mylink;
