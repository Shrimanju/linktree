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
import { useSelector } from "react-redux";

const MobileContainer = (props) => {
  const [links, setlinks] = useState([]);
  const [color, setColor] = useState("white");

  const themeColors = useSelector((state) => state.themeColor);
  console.log("themeColors", themeColors);
  // setColor(themeColors);

  useEffect(() => {
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

  const useStyles = makeStyles({
    typography: {
      backgroundColor: themeColors,
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
          <Avatar className={classes.avatar} />
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
