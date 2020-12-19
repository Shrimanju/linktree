import React from "react";
import classes from "../MobileContainerView/MobileContainerView.module.css";

function MobileContainerView({ title }) {
  return (
    <div className={classes.ContainerView}>
      <span>{title}</span>
    </div>
  );
}

export default MobileContainerView;
