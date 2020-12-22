import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { firebaseApp } from "../../../Firebase_config/firebase";
import Logo from "../../../Assets/logo.png";
import Button from "@material-ui/core/Button";
import InstagramIcon from "@material-ui/icons/Instagram";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { yupResolver } from '@hookform/resolvers/yup';
import AppleIcon from '@material-ui/icons/Apple';
// import Google from './../../../Assets/iconfinder_Google_703526.png';
import Google from '@material-ui/icons/GTranslate';
import * as yup from 'yup';
import firebase from 'firebase'
const schema = yup.object().shape({
  email: yup.string()
    .email()
    .required("Email id should Required"),
 
  password: yup.string()
    .required("No password provided.")
    .min(6, "Password should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
   
}); 
const Login = () => {
  const { handleSubmit, register, errors } = useForm(
    {
      resolver: yupResolver(schema),
    }
  );

  const [ErrorMessages, setErrorMessages] = useState();
  const [remember,setRemember] = useState();

  const onSubmit = (data) => {
      firebaseApp.auth().setPersistence(remember?firebase.auth.Auth.Persistence.LOCAL:firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
  
      return firebaseApp.auth().signInWithEmailAndPassword(data.email,data.password)
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    }
   
const onChangecheckbox=(e)=>{
// console.log(e.target.checked)
setRemember(e.target.checked)
}
const signinwithgoogle=()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
 });
//  firebaseApp.auth().signInWithRedirect(provider)
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }
  const signinwithapple=()=>{
    var provider = new firebase.auth.OAuthProvider('apple.com');
    firebase
  .auth()
  .signInWithPopup(provider)
  firebase.auth().signInWithRedirect(provider)
  .getRedirectResult()
  .then(function(result) {
    // The signed-in user info.
    var user = result.user;
     // You can also get the Apple OAuth Access and ID Tokens.
    var accessToken = result.credential.accessToken;
    var idToken = result.credential.idToken;

    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
  }

  return (
    <div className="login-body">
      <div className="logo">
        <img src={Logo} />
        &nbsp;
        <h1>linktree</h1>
      </div>

      <div className="text-center text">
        <h5>Log in to continue to your Linktree admin</h5>
      </div>

      <div className="loginPart text-center" style={{ height: "500px" }}>
        <div className="instaButton">
          <Button
            style={{ minWidth: "400px", fontWeight: "700", fontSize: "75%" }}
            color="default"
            variant="contained"
            // startIcon={<Google />}
            onClick={signinwithgoogle}
          >
            <span> Sign in with Google </span>
          </Button>
         
        </div>
        <div className="instaButton1">
          <Button
            style={{ minWidth: "400px", fontWeight: "700", fontSize: "75%" }}
            color="default"
            variant="contained"
            startIcon={<AppleIcon />}
    
            onClick={signinwithapple}
          >
            <span> Sign in with Apple </span>
          </Button>
          </div>

        <div className="horizontalLine">
          <h5>
            <span>or</span>
          </h5>
        </div>
        <div className="text-center">
          <p className="text-danger">{ErrorMessages}</p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>


            
            <TextField
              type="email"
              name="email"
              inputRef={register({ required: true })}
              className="email"
              style={{ minWidth: "470px" }}
              id="standard-basic"
              label="Email"
            />
        
            <br></br>
            {errors.email?.message && <span className="text-danger1">{errors.email?.message}</span>} 
            <br></br>
            
            <TextField
              type="password"
              name="password"
              inputRef={register({ required: true })}
              style={{ minWidth: "470px" }}
              id="standard-basic"
              label="Password"
            />
            <br></br>
            {errors.password?.message && <span className="text-danger4">{errors.password?.message}</span>} 
            <br></br>
            <FormControlLabel
              style={{ minWidth: "470px" }}
              control={<Checkbox value="members" color="primary" />}
              label="Remember me"
            onChange={onChangecheckbox}            
             
            />
            <br></br>
            <br></br>
            <Button
              type="submit"
              style={{ minWidth: "400px" }}
              color="default"
              variant="contained"
            >
              Log in
            </Button>
            <br></br>&nbsp;
            <a className="link_login" href="/fotgotPassword">
              <p>Forgot your password? Click to reset</p>
            </a>
          </form>
        </div>
      </div>
      <div className="creatAccountPart text-center">
        <a className="link_login" href="/signup">
          <p>Don't have an account?</p>
        </a>
      </div>
      <p className="footer">
        <span>Trust Centre</span> <span>Report a Violation</span>
        <span>Careers</span>
      </p>
    </div>
  );
};

export default Login;
