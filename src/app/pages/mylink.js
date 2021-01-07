import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import classes from "../../styles/MyLink/Mylink.module.css";
import MyLinkContainer from "../component/MyLinkContainer/MyLinkContainer";
import db, { auth } from "../../Firebase_config/firebase";
import ls from "local-storage";
import { useSelector } from "react-redux";
// import { selectorImage } from "../../utils/index";
import { firebaseApp, storage, database } from "../../Firebase_config/firebase";
import ImageUploadWithCrop from "../component/ImageUpload/imageUpload";

function Mylink() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [URL, setURL] = useState("");
  const [links, setlinks] = useState([]);
  var selectorImage = useSelector((state) => state.imageUrl);
  const [userbio, setUserbio] = useState();
  // console.log("Image", selectorImage);

  // setTimeout(() => {
  //   selectorImage = useSelector((state) => state.imageUrl);
  // }, 3000);
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot)=>{
       if(snapshot.exists){
        //  console.log(snapshot.data().name)
        setUserbio(snapshot.data().bio)
       } 
     
      })

 
  }, []);
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
    // if (email) {
    //   storage
    //     .ref(email)
    //     .child("ProfileImage")
    //     .child("ProfileImage.jpg")
    //     .getDownloadURL()
    //     .then((url) => {
    //       setURL(url);
    //       console.log("URL", url);
    //     })
    //     .catch(() => {
    //       console.log("Error while fetching image");
    //     });
    // }
  });

  return (
    <div className={classes.mylink_container}>
      <div className={classes.header}>
       
        <ImageUploadWithCrop width={"100px"} height={"100px"} />

        <h5>{username}</h5>
        <p className={classes.header_bio}>{userbio}</p>
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
