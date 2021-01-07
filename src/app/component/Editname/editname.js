import React, { Component, useState,useEffect } from "react";
import "./Editname.css";
import db, { firebaseApp, auth } from "../../../Firebase_config/firebase";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import EdiText from 'react-editext'
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
const Editname = () => {
  let history = useHistory();
  const { handleSubmit, register, errors } = useForm({
});
const [username, setUsername] = useState();
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
 const onSubmit = (data) => {
          db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            name: data.name,
          });
        }
        const classes = useStyles();
        useEffect(() => {
          db.collection("users")
            .doc(auth.currentUser.uid)
            .onSnapshot((snapshot)=>{
             if(snapshot.exists){
              //  console.log(snapshot.data().name)
              setUsername(snapshot.data().name)
             } 
           
            })
      
       
        }, []);
  return (
    <div className="editborder">

              <form onSubmit={handleSubmit(onSubmit)}  className="editnameandicon1">
            <TextField
              type="text"
              name="name"
              value={username}
              inputRef={register({ required: true })}
              InputProps={{ classes }}
              className="editname1"
              // label={username}
              
              // defaultValue="Update display name"
            />
             {/* <  Button
              type="submit"
              className="editnameicon1"
              color="default"
              variant="contained"
            >
         submit
            </Button> */}
            <br></br>
           
            
          </form>









     
        </div>
  );
};

export default Editname;
