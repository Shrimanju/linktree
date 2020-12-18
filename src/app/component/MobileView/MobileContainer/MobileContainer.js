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
// import { selectorImage } from "../../../../utils/index";
import { useSelector } from "react-redux";

const MobileContainer = (props) => {
  const [links, setlinks] = useState([]);
  const [color, setColor] = useState({});
  const [username, setUsername] = useState();
  const [URL, setURL] = useState("");
  const selectorImage = useSelector((state) => state.imageUrl);

  // db.collection("users")
  //   .doc(auth.currentUser.uid)
  //   .collection("themeColor")
  //   .doc("color")
  //   .get()
  //   .then(function (doc) {
  //     if (doc.exists) {
  //       // console.log("Document data:", doc.data());
  //       setColor(doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting document:", error);
  //   });

  useEffect(() => {
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
    }, 2000);

    // setInterval(() => {
    //   db.collection("users")
    //     .doc(auth.currentUser.uid)
    //     .collection("themeColor")
    //     .doc("color")
    //     .get()
    //     .then(function (doc) {
    //       if (doc.exists) {
    //         // console.log("Document data:", doc.data());
    //         setColor(doc.data());
    //       } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log("Error getting document:", error);
    //     });
    // }, 2000);

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

  useEffect(() => {
    console.log("ThemeColor", color.bgColor);
    console.log("ThemeColor", color.fontColor);

    if (color) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("themeColor")
        .doc("color")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            setColor(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [color]);

  const useStyles = makeStyles({
    typography: {
      backgroundColor: color.bgColor || "white",
      color: color.fontColor || "grey",
      // backgroundColor: themeColors || color,
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
    <MuiThemeProvider theme={theme}>
      <Typography
        variant="contained"
        // className={`${classes.container}`}
        className={`${classes.container} ${classed.typography}`}
      >
        <div className={classes.container_heading}>
          {selectorImage || URL ? (
            <>
              <img className={classes.link} src={selectorImage || URL} />
            </>
          ) : (
            <>
              <Avatar className={classes.avatar} />
            </>
          )}
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
