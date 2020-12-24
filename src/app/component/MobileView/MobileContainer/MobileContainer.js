import React, { useState } from "react";
import classes from "../MobileContainer/MobileContainer.module.css";
import MobileContainerView from "./MobileContainerView/MobileContainer.View";
import db, { auth } from "../../../../Firebase_config/firebase";
import { Avatar, Box } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import orange from "@material-ui/core/colors/orange";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { green } from "@material-ui/core/colors";
import ls from "local-storage";
import { ImageUrlAction } from "../../../Redux/Action/ActionFile";
import ReactLoading from "../../ImageLoader/spinner";
import ImageUploadWithCrop from "../../ImageUpload/imageUpload";

// import { selectorImage } from "../../../../utils/index";
import {
  firebaseApp,
  storage,
  database,
} from "../../../../Firebase_config/firebase";
import { useSelector, useDispatch } from "react-redux";

const MobileContainer = (props) => {
  const [links, setlinks] = useState([]);
  const [color, setColor] = useState({});
  const [username, setUsername] = useState();
  const [URL, setURL] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const selectorImage = useSelector((state) => state.imageUrl);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user1) => {
      // db.collection("users")
      //   .doc(user1.uid)
      //   .get()
      //   .then((doc) => {
      //     if (doc.exists) {
      //       setUsername(doc.data().email);
      //     } else {
      //       console.log("Error in document");
      //     }
      //   });

      const changeThemeColor = db
        .collection("users")
        .doc(user1.uid)
        .collection("themeColor")
        .doc("color")
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setColor(snapshot.data());
          } else {
            setColor({});
          }
        });
      // .doc("color")
      // .get()

      // .then(function (doc) {
      //   console.log("Theme Color in Firestore");
      //   if (doc.exists) {
      //     setColor(doc.data());
      //   } else {
      //     console.log("No such document!");
      //   }
      // })
      // .catch(function (error) {
      //   console.log("Error in getting theme color:", error);
      // });

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
        changeThemeColor();
      };
    });
  }, []);

  // useEffect(() => {
  //   var user = firebaseApp.auth().currentUser;

  //   if (user) {
  //     if (color) {
  //       db.collection("users")
  //         .doc(user.uid)
  //         .collection("themeColor")
  //         .doc("color")
  //         .get()
  //         .then(function (doc) {
  //           console.log("Theme Color in Firestore");
  //           if (doc.exists) {
  //             setColor(doc.data());
  //           } else {
  //             console.log("No such document!");
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log("Error in getting theme color:", error);
  //         });
  //     }
  //   }
  // }, [links]);

  const useStyles = makeStyles({
    typography: {
      backgroundColor: color.bgColor || "white",
      color: color.fontColor || "grey",
    },
  });

  const classed = useStyles();

  const theme = createMuiTheme({
    palette: {
      background: {
        primary: orange,
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme} key={props.user}>
      <Typography
        variant="contained"
        className={`${classes.container} ${classed.typography}`}
      >
        <div className={classes.container_heading}>
          {/* {loading ? (
            <ReactLoading spin={loading} />
          ) : selectorImage ? (
            // {URL ? (
            <>
              <img
                className={classes.link}
                src={selectorImage || URL}
                alt={Avatar}
              />
            </>
          ) : (
            <>
              <Avatar className={classes.avatar} />
            </>
          )} */}
          <ImageUploadWithCrop />

          <span>{props.user}</span>
        </div>
        {links.map((link) => {
          if (link.data.isactive === true) {
            return (
              <MobileContainerView
                key={link.id}
                id={link.id}
                title={link.data.title}
              />
            );
          }
        })}
      </Typography>
    </MuiThemeProvider>
  );
};

export default MobileContainer;
