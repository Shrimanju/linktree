import React from "react";
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
import QRCode from "react-qr-code";
import { Base_URL } from "../../../utils/index";
import Logo from "../../../Assets/logo.png";

const useStyles = makeStyles({
  avatar: {
    // backgroundColor: grey[100],
    // color: grey[600],
  },
  dialogBox: {
    width: 500,
    height: 700,
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  //Remove
  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div style={{ width: "500px", height: "400px", textAlign: "center" }}>
        <DialogTitle id="simple-dialog-title">
          <img src={Logo} />
          linktree
        </DialogTitle>
        <DialogTitle id="simple-dialog-title">
          Link : {`${Base_URL}/Neha`}
        </DialogTitle>
        <QRCode value={Base_URL + "/Neha"} />
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
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
          {" "}
          Download my QR code
        </span>
      </button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
