import React, { Component, useState, useEffect } from "react";
import "./editbio.css";
import db, { firebaseApp, auth } from "../../../Firebase_config/firebase";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";



const useStyles = makeStyles((theme) => ({

  typography: {
    padding: theme.spacing(2),
  },
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
}));

export default function Editbio() {

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [userbio, setUserbio] = useState("");
  const { handleSubmit, register, errors } = useForm({});
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [message, SetMessage] = useState("");



  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={emoji => SetMessage(message + emoji.native)}
      />
    );
  }

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSubmit = (data) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        bio: data.bio,
      });
  }

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          //  console.log(snapshot.data().name)
          setUserbio(snapshot.data().bio)
        }
      })
  }, []);



  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? 'simple-popover' : undefined;
  return (
    <div>
      <div className="bioborder">
        <div className="updatebiolabel">
          {userbio ? <p onClick={handleClick} className="biobordertext">{userbio}</p> :
            <p onClick={handleClick} className="biobordertext">update bio.</p>}
        </div>

      </div>
      <Popover
        id={id1}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 440 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { width: '29%' },
        }}
      >
        <Typography className={classes.typography}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="name"
              multiline={true}
              rows={5}
              type="text"
              name="bio"
              value={message}
              onChange={event => SetMessage(event.target.value)}
              inputRef={register()}
              id="standard-basic"
              InputProps={{ classes }}
              className="editbiotext"
            />
            {emojiPicker}


            <span role="img" aria-label="" onClick={triggerPicker}>
              😁
  </span>
            <br></br>
            <div className="editbiobutton11">
              <button
                type="submit"
                variant="contained"
                className="editbiobutton1"
              >

                Update
            </button>
            </div>
          </form>
        </Typography>
      </Popover>
    </div>
  );
}
