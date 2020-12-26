import React, { useState } from "react";
import "./ForgotPassword.css";
import { useForm } from "react-hook-form";
import { firebaseApp } from "../../../Firebase_config/firebase";
import Logo from "../../../Assets/logo.png";
import Button from "@material-ui/core/Button";
import InstagramIcon from "@material-ui/icons/Instagram";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const { handleSubmit, register, errors } = useForm();
  const [ErrorMessages, setErrorMessages] = useState();

  const customAlert = useAlert();

  const onSubmit = (data) => {
    setErrorMessages("");
    console.log("data.email", data.email);
    firebaseApp
      .auth()
      // .confirmPasswordReset(data.email)
      .sendPasswordResetEmail(data.email)

      .then((u) => {
        console.log(u);
        customAlert("Email has been sent to you, please check and verify");
      })
      .catch((err) => {
        setErrorMessages(err.message);
        console.log(err);
      });
  };

  return (
    <div className="forgat-body">
      <div className="forgatlogo">
        <img src={Logo} />
        &nbsp;
        <h1>Linktree</h1>
      </div>
      <div className="forgettext">
        <h5> Enter your email to receive a password reset email.</h5>
      </div>

      <div className="forgatloginPart text-center" style={{ height: "150px" }}>
        <div className="text-center">
          <span className="text-danger">{ErrorMessages}</span>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="email"
              name="email"
              inputRef={register({ required: true })}
              style={{ minWidth: "470px" }}
              id="standard-basic"
              label="Email"
            />
            <br></br>
            {errors.email && (
              <span className="text-danger1">E-mail field is required</span>
            )}
            <br></br>
            <Button
              type="submit"
              style={{ minWidth: "400px" }}
              color="default"
              variant="contained"
            >
              Reset Password
            </Button>
            {/* <br></br>&nbsp; */}
          </form>
        </div>
      </div>
      <div className="creatAccountPart text-center">
        <a className="link_login" href="/">
          <p style={{ fontSize: "17px", fontWeight: 500 }}>Back to Login</p>
        </a>
      </div>
      <p className="forgatfooter">
        <span className="forgatfooter12">Trust Centre</span>{" "}
        <span className="forgatfooter12">Report a Violation</span>
        <span className="forgatfooter12">Careers</span>
      </p>
    </div>
  );
};

export default ForgotPassword;
