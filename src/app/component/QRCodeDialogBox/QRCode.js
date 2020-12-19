import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
// import PersonIcon from "@material-ui/icons/Person";
// import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import QRCode from "qrcode.react";
import { Base_URL } from "../../../utils/index";
import Logo from "../../../Assets/logo.png";
import classed from "./qrCode.module.css";

// const useStyles = makeStyles({
//   avatar: {
//     // backgroundColor: grey[100],
//     // color: grey[600],
//   },
//   dialogBox: {
//     width: 500,
//     height: 700,
//   },
// });

function SimpleDialog(props) {
  // const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [username, setUsername] = useState();
  useEffect(() => {
    console.log("username", props.username);
    setUsername(props.username);
  }, []);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onCliclHandlerDownload = (e) => {
    e.preventDefault();
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    // downloadLink.button = pngUrl;
    downloadLink.href = pngUrl;
    downloadLink.download = "qrCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // console.log("png", pngImg);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={classed.qr_Card_box}>
        {/* <DialogTitle id="simple-dialog-title"> */}
        <DialogTitle>
          <img className={classed.image} src={Logo} />
          <span className={classed.logo_title}>linktree</span>
        </DialogTitle>
        {/* <DialogTitle id="simple-dialog-title">{`${Base_URL}/Neha`}</DialogTitle> */}
        <DialogTitle className={classed.link}>
          {`${Base_URL}/${username}`}
        </DialogTitle>

        <QRCode id="qrCode" value={`${Base_URL}/${username}`} />
        <br />
        <div>
          <a
            href="/"
            className={classed.downloadLink}
            onClick={onCliclHandlerDownload}
          >
            Save Image
          </a>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("QR Code");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1">
      </Typography> */}
      {/* <br /> */}
      {/* <Button variant="outlined" color="primary" >
        Download my QR code
      </Button> */}
      <button
        style={{ width: "200px", background: "white" }}
        onClick={handleClickOpen}
      >
        <span style={{ color: "#75736d", fontSize: "80%" }}>
          Download my QR code
        </span>
      </button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        username={props.username}
      />
    </div>
  );
}
