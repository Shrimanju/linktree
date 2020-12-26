import React from "react";
import classes from "../MobileContainerView/MobileContainerView.module.css";

function MobileContainerView({ title, url }) {
  return (
    <a href={url} target="_blank" className={classes.ContainerView}>
      <span>{title}</span>
    </a>
  );
}

export default MobileContainerView;
