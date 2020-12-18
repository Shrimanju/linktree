import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { firebaseApp } from "../../Firebase_config/firebase";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import classed from "../../styles/Settings/settings.module.css";
import { Email } from "@material-ui/icons";
import { useAlert } from "react-alert";
import firebase from "firebase";

const Settings = () => {
  const { handleSubmit, register, errors } = useForm();
  const [ErrorMessages, setErrorMessages] = useState();

  const customAlert = useAlert();

  const onSubmit = (data) => {
    // e.preventDefault();

    if (data.password === data.confpassword) {
      setErrorMessages("");

      var user = firebaseApp.auth().currentUser;

      // const emailCred = firebaseApp.auth.EmailAuthProvider.credential(
      //   user.email,
      //   data.currentPassword
      // );
      const emailCred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      );

      firebaseApp
        .auth()
        .currentUser.reauthenticateWithCredential(emailCred)
        .then((u) => {
          firebaseApp
            .auth()
            .currentUser.updatePassword(data.password)
            .then(() => {
              customAlert.success("Password changed");
            })
            .catch((err) => {
              // setErrorMessages("Password not changed");
              customAlert.error("Password not changed");
            });
        })
        .catch((err) => {
          setErrorMessages(err.message);
          console.log(err);
        });

      // firebaseApp
      //   .auth()
      //   .currentUser.reauthenticateWithCredential(user)
      //   .then((cred) => {
      //     firebaseApp.auth().currentUser.updatePassword(data.password);
      //   });

      // firebaseApp
      //   .auth()
      //   .currentUser.updatePassword(data.password)

      //   .then((u) => {
      //     console.log(u);
      //     console.log("Password updated");
      //   })
      //   .catch((err) => {
      //     setErrorMessages(err.message);
      //     console.log(err);
      //   });
    } else {
      setErrorMessages("Password is not match");
    }
  };

  return (
    <div className={classed.settings}>
      <h3 className={classed.heading}>Change Password</h3>
      <div className={classed.changePassword}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="password"
            name="currentPassword"
            inputRef={register({ required: true })}
            style={{ minWidth: "85%" }}
            id="standard-basic"
            label="Current Password"
          />
          <br></br>
          {errors.currentPassword && (
            <span className="text-danger">
              Current Password field is required
            </span>
          )}
          <br></br>
          <TextField
            type="password"
            name="password"
            inputRef={register({ required: true })}
            style={{ minWidth: "85%" }}
            id="standard-basic"
            label="New Password"
          />
          <br></br>
          {errors.password && (
            <span className="text-danger">Password field is required</span>
          )}
          <br></br>
          <TextField
            type="password"
            name="confpassword"
            inputRef={register({ required: true })}
            style={{ minWidth: "85%" }}
            id="standard-basic"
            label="Confirm New Password"
          />
          <br></br>
          <span className="text-danger">{ErrorMessages}</span>
          {errors.confpassword && (
            <span className="text-danger">
              Confirm Password field is required
            </span>
          )}
          <br></br>
          <Button
            type="submit"
            style={{ minWidth: "80%", marginLeft: "3%" }}
            color="default"
            variant="contained"
          >
            Change password
          </Button>
          <br></br>&nbsp;
        </form>
      </div>
    </div>
  );
};

export default Settings;
