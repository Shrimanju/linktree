import React, { Component, useState, useEffect } from "react";
import "./editbio.css";
import db, { firebaseApp, auth } from "../../../Firebase_config/firebase";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useHistory } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
  

const Editbio = () => {
    const [userbio, setUserbio] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const useStyles = makeStyles((theme) => ({
        typography: {
          padding: theme.spacing(2),
        },
      }));
  let history = useHistory();
  const { handleSubmit, register, errors } = useForm({
});
const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  
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
      .onSnapshot((snapshot)=>{
       if(snapshot.exists){
        //  console.log(snapshot.data().name)
        setUserbio(snapshot.data().bio)
       } 
     
      })

 
  }, []);
  useEffect(()=>{
console.log(anchorEl)
  },[anchorEl]
  );
        const classes = useStyles();


  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(true)
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
     return (
    <div >
        <div className="bioborder">
         <p className="biobordertext" onClick={handleClick}> {userbio} </p>

         </div>


 {/* <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        </Button> */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style: { width: '14%' },
              }}
            >
              <Typography className={classes.typography}>
              <form onSubmit={handleSubmit(onSubmit)}>

<TextField
                id="standard-multiline-static"
                multiline={true}
                rows={3}
              type="text"
              name="bio"
              inputRef={register({ required: true })}
              id="standard-basic"
              label="Bio"
      
            />
             <br></br>
            <Button
              type="submit"
              color="default"
              variant="contained"
            >
              Update
            </Button>
          </form>
              </Typography>
            </Popover>
            </div>
  );
};

export default Editbio;
