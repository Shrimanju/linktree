import React, { Component, useState } from "react";
import "./Signup.css";
import db, { firebaseApp, auth } from "../../../Firebase_config/firebase";
import { useForm } from "react-hook-form";
import Logo from "../../../Assets/logo.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const Signup = () => {
  let history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorMessageFirebase, setErrorMessageFirebase] = useState();
  const onSubmit = (data) => {
    if (data.password === data.confpassword) {
      setErrorMessage("");
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((u) => {
          db.collection("users").doc(auth.currentUser.uid).set({
            email: data.email,
            name: data.name,
            // password:data.pa
          });
          history.push("/");
        })
        .catch((err) => {
          setErrorMessageFirebase(err.message);
          console.log(err);
        });
      // history.push("/");
      console.log(data);
    } else {
      setErrorMessage("Password is not match");
    }
  };

  return (
    <div className="login-body">
      <div className="logo">
        <img src={Logo} />
        &nbsp;
        <h1>Linktree</h1>
      </div>
      <div className="text-center text">
        <h5 className="reset-password-heading">
          Sign up for your Linktree account
        </h5>
      </div>

      <div className="loginPart text-center" style={{ height: "450px" }}>
        <div className="formPart">
          <div className="text-center">
            <span className="text-danger">{ErrorMessageFirebase}</span>
          </div>
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
              <span className="text-danger">E-mail field is required</span>
            )}
            <br></br>
            <TextField
              type="text"
              name="name"
              inputRef={register({ required: true })}
              style={{ minWidth: "470px" }}
              id="standard-basic"
              label="Name"
            />
            <br></br>
            {errors.Name && (
              <span className="text-danger">Name field is required</span>
            )}
            <br></br>
            <TextField
              type="password"
              name="password"
              inputRef={register({ required: true })}
              style={{ minWidth: "470px" }}
              id="standard-basic"
              label="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
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
              style={{ minWidth: "470px" }}
              id="standard-basic"
              label="Confirm Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <br></br>
            <span className="text-danger">{ErrorMessage}</span>

            {errors.confpassword && (
              <span className="text-danger">
                Confirm Password field is required
              </span>
            )}
            <br></br>
            <br></br>
            <Button
              type="submit"
              style={{ minWidth: "400px" }}
              color="default"
              variant="contained"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
      <div className="creatAccountPart text-center">
        <p>
          By using this service you are agreeing to the terms of service and
          privacy policy
        </p>
        <a className="link_login" href="/">
          <h6>Already have an account?</h6>
        </a>
      </div>
      <p className="footer">
        <span>Trust Centre</span> <span>Report a Violation</span>
        <span>Careers</span>
      </p>
    </div>
  );
};

export default Signup;
