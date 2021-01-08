import React, { Component, useState, useEffect } from "react";
import "./editbio.css";
import db, { firebaseApp, auth } from "../../../Firebase_config/firebase";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import EmojiPicker from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import JSEMOJI from "emoji-js";
import { useHistory } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
let jsemoji = new JSEMOJI();


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
  const [emojies, setEmojies] = useState("");
  const [text, setText] = useState("");
  const [bio, setBio] = useState("");
  const { handleSubmit, register, errors } = useForm({});
  const [chosenEmoji, setChosenEmoji] = useState(null);
  


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
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


  useEffect(() => {
    console.log(anchorEl)
  }, [anchorEl]
  );

 
  // useEffect(()=>{
  //   if(text){
  //     let value=text+emojies
  //     setBio(value)


  //   }
  //   else{
  // setBio(text)
  //  setEmojies("")
  //   }

  // setBio(emojies.emoji+text)
  // console.log(text+emojies.emoji)
  // },[text,emojies]
  // );

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? 'simple-popover' : undefined;


  const handleClick2 = (event, emojiObject) => {
    console.log(event)
    // console.log(emojiObject)
    setEmojies(emojiObject.emoji)
    // console.log(C)   
    setBio(text + emojiObject.emoji)
    // let emoji = jsemoji.replace_colons(`:${e.name}:`)
    // console.log("emogi",emoji)
    // let emoji = jsemoji.replace_colons(`:${e.name}:`);
    // setText({
    //   text: text 
    // });
    // console.log(text.text);
  };

  return (
    <div>
      {/* <EditIcon 
                          aria-describedby={id}  
                          // onClick={handleClick1}
                          //  className="editbutton"
                           
                           >
</EditIcon> */}
      <div className="bioborder">
        <div className="updatebiolabel">
          {userbio ? <p onClick={handleClick} className="biobordertext">{userbio}</p> :
           <p onClick={handleClick} className="biobordertext">update bio.</p>}
         {/* <p onClick={handleClick} className="biobordertext"> {!userbio ? <label>update bio</label>:userbio}</p> */}
         {/* <TextField
              id="standard-multiline-static"
              multiline={true}
               rows={4}
              type="text"
              value={userbio}
              onChange={e => setText(e.target.value)}
              onClick={handleClick}
              InputProps={{ classes }}
              inputRef={register()}
              id="standard-basic"
            /> */}

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

      >
        <Typography className={classes.typography}>
          <form onSubmit={handleSubmit(onSubmit)}>


            <TextField
              id="standard-multiline-static"
              multiline={true}

              rows={5}
              type="text"
              name="bio"
              value={bio || text}
              onChange={e => setText(e.target.value)}
              // value= {text?text+emojies.emoji:null}
              InputProps={{ classes }}
              inputRef={register()}
              id="standard-basic"

              className="editbiotext"
            />
            <SentimentSatisfiedIcon onClick={handleClick1} />
            <Popover
              id={id}
              open={open1}
              anchorEl={anchorEl1}
              onClose={handleClose1}
            >
              <Typography className={classes.typography}> <EmojiPicker onEmojiClick={handleClick2} /></Typography>
            </Popover>




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
