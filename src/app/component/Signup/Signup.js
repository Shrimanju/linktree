import React, { Component, useState } from "react";
import "./Signup.css";
import db, { firebaseApp, auth } from "../../../Firebase_config/firebase";
import { useForm } from "react-hook-form";
import Logo from "../../../Assets/logo.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HideOrShowPassword from "../HideOrShowPassword/HideOrShowPassword";
  const schema = yup.object().shape({
    email: yup.string()
      .email()
      .required("Email id should Required"),

    name: yup.string().required(),
    password: yup.string()
      .required("No password provided.")
      .min(6, "Password should be 6 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
      confpassword:yup.string().required(" Confirm Password field is required")
      .oneOf([yup.ref('password'), null], "Passwords don't match!")
  }); 

const Signup = () => {
  let history = useHistory();
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorMessageFirebase, setErrorMessageFirebase] = useState();
  const [showPassword, setShowPassword] = useState({
    pwd: false,
    cpwd: false,
  });
  
  const onSubmit = (data) => {
    if (data.password === data.confpassword) {
      setErrorMessage("");
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((u) => {
          db.collection("users").doc(auth.currentUser.uid).set({
            email: data.email,
            name: data.name,
            bio:[],
          });
          history.push("/");
        })
        .catch((err) => {
          setErrorMessageFirebase(err.message);
          console.log(err);
        });

      console.log(data);
    } else {
      setErrorMessage("Password is not match");
    }
  };

  return (
    <div className="sign-body">
      <div className="signuplogo">
        <img src={Logo} />
        &nbsp;
        <h1>Linktree</h1>
      </div>
      <div className="signuptext1">
        <h5>Sign up for your Linktree account</h5>
      </div>

      <div className="signupPart " >
        <div className="formPart">

          <div className="text-center">
            <span className="text-danger">{ErrorMessageFirebase}</span>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="text"
              name="email"
              inputRef={register({ required: true })}
              className="textfield"
              id="standard-basic"
              label="Email"
            />

            <br></br>
            {errors.email?.message && (
              <span className="text-danger1">{errors.email?.message}</span>
            )}
            <br></br>
            <TextField
              type="text"
              name="name"
              inputRef={register({ required: true })}
              className="textfield"
              id="standard-basic"
              label="Name"
            />
            <br></br>

            {errors.name?.message && (
              <span className="text-danger1">{errors.name?.message}</span>
            )}
            <br></br>
            <TextField
              type={showPassword.pwd ? "text" : "password"}
              name="password"
              inputRef={register({ required: true })}
              className="textfield"
              id="standard-basic"
              label="Password"
            />
            <HideOrShowPassword
              showPwd={(pwd1) => {
              
                setShowPassword({
                  pwd: pwd1,
                  cpwd: showPassword.cpwd,
                });
              
              }}
            />
            <br></br>
            {errors.password?.message && (
              <span className="text-danger4">{errors.password?.message}</span>
            )}

            <br></br>
            <TextField
              type={showPassword.cpwd ? "text" : "password"}
              name="confpassword"
              inputRef={register({ required: true })}
              className="textfield"
              id="standard-basic"
              label="Confirm Password"
            />
            <HideOrShowPassword
              showPwd={(pwd1) => {

                setShowPassword({
                  pwd: showPassword.pwd,
                  cpwd: pwd1,
                });
              }}
            />
            <br></br>
            <span className="text-danger">{ErrorMessage}</span>
            <span className="text-danger">{ErrorMessage}</span>
            {errors.confpassword?.message && (
              <span className="text-danger2">
                {errors.confpassword?.message}
              </span>
            )}
            <br></br>
            <Button
              type="submit"
              className="loginbutton1"
              color="default"
              variant="contained"
            >
              Register
            </Button>
          </form>
        </div>
        
    
       
      </div>
      <div className="logincreatAccountPart">
      <div className="creatAccountPart text-center">
          <p>
            By using this service you are agreeing to the terms of service and
            privacy policy
          </p>
          <a className="link_login" href="/">
            <h6>Already have an account?</h6>
          </a>
        </div>
        </div>
        <p className="signupfooter">
          <span className="signupfooter1"> Trust Centre</span>{" "}
          <span className="signupfooter1">Report a Violation.</span>
          <span className="signupfooter1">Careers</span>
        </p>
    </div>
  );
};

export default Signup;
