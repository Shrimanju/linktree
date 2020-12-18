import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import classes from "../../styles/MyLink/Mylink.module.css";
import MyLinkContainer from "../component/MyLinkContainer/MyLinkContainer";
import db, { auth } from "../../Firebase_config/firebase";
import ls from "local-storage";
import { useSelector } from "react-redux";
// import { selectorImage } from "../../utils/index";

function Mylink() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [URL, setURL] = useState("");
  const [links, setlinks] = useState([]);
  const selectorImage = useSelector((state) => state.imageUrl);

  // setInterval(() => {
  //   var getURLFromLocalStorage = ls.get("ArrayOfImageDetails") || "";

  //   // console.log("getURLFromLocalStorage", getURLFromLocalStorage);
  //   if (getURLFromLocalStorage) {
  //     getURLFromLocalStorage.map((userImage) => {
  //       if (userImage.email === email) {
  //         // console.log("URL", userImage.url);
  //         setURL(userImage.url);
  //       }
  //     });
  //   }
  // }, 1000);

  useEffect(() => {
    // const interval =
    setTimeout(() => {
      db.collection("users")
        .doc(auth.currentUser.uid)
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
    }, 2000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <div className={classes.mylink_container}>
      <div className={classes.header}>
        {selectorImage || URL ? (
          <>
            <img className={classes.link} src={selectorImage || URL} />
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
