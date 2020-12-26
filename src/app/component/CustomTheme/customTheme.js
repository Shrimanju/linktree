import React, { useState } from "react";
import CustomTheme from "../../../Assets/customTheme.png";
// import CustomeThemeSetter from "./CustomThemeDialogBox";
import classes from "./customTheme.module.css";
// import Dialog from "@material-ui/core/Dialog";
import { Dialog, Typography, TextField, Button } from "@material-ui/core";
import PropTypes from "prop-types";

function CustomeThemeSetter(props) {
  const { open, onClose, selectedValue } = props;

  const handleClose = () => {
    // setDialogClose(true);
    onClose(selectedValue);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      // key={openDialogBox}
    >
      <Typography>Background color</Typography>
      <TextField />
      <Typography>Font color</Typography>
      <TextField />
      <Button>Set</Button>
      <Button>Close</Button>
    </Dialog>
  );
}

CustomeThemeSetter.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export const CreateCustomTheme = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Custom Theme");

  const themeClickHandler = () => {
    if (props.getThemeDetails) {
      props.getThemeDetails("orange", "black");
    }
  };

  const handleClose = (value) => {
    setOpen(false);
    // setOpenDialogBox(false);
    setSelectedValue(value);
  };
  return (
    <div className="col col-xs">
      <img
        src={CustomTheme}
        onClick={() => {
          themeClickHandler("dimgray", "white");
          setOpen(true);
        }}
        className={classes.color1}
        // style={{ width: "200px", height: "300px", cursor: "pointer" }}
      />
      <CustomeThemeSetter open={open} onClose={handleClose} />
    </div>
  );
};

// export default CreateCustomTheme;
