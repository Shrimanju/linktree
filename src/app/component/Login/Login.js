import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { firebaseApp } from "../../../Firebase_config/firebase";
import Logo from "../../../Assets/logo.png";
import Google from "../../../Assets/google.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { yupResolver } from '@hookform/resolvers/yup';
import AppleIcon from '@material-ui/icons/Apple';
import * as yup from 'yup';
import firebase from 'firebase'
import HideOrShowPassword from "../HideOrShowPassword/HideOrShowPassword";
const schema = yup.object().shape({
  email: yup.string().email().required("Email id should Required"),

  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});
const Login = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [ErrorMessages, setErrorMessages] = useState();
  const [remember,setRemember] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [ErrorMessageFirebase, setErrorMessageFirebase] = useState();
  const onSubmit = (data) => {
  

      firebaseApp.auth().setPersistence(remember?firebase.auth.Auth.Persistence.LOCAL:firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
  
      return firebaseApp.auth().signInWithEmailAndPassword(data.email,data.password)
    })
    
    .catch((err) => {
      setErrorMessageFirebase("email or password incorrect!.");
      console.log(err);
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

  
  });
  }

  return (
    <div className="login-body">
      <div className="logo1">
        <img src={Logo} />
        &nbsp;
        <h1>linktree</h1>
      </div>

      <div className="text1">
        <h4>Log in to continue to your Linktree admin</h4>
      </div>
      
      <div className="loginPart1">
        <div className="instaButton">
          <Button
            className="instaButton11"
            color="default"
            variant="contained"          
            onClick={signinwithgoogle}
          >
             <img src={Google}
             style={{ width:"5%",height:"5%" ,marginRight:"2%"}}
             />
            <span> Sign in with Google </span>
          </Button>
         
        </div>
        <div className="instaButton1">
          <Button
           className="instaButton11"
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
        <span className="text-danger">{ErrorMessageFirebase}</span>
          <p className="text-danger">{ErrorMessages}</p>
        </div>
        <div className="link_login1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="email"
              name="email"
              inputRef={register({ required: true })}
              className="email"
              // style={{ minWidth: "470px" }}
              id="standard-basic"
              label="Email"
            />
            <br></br>
            {errors.email?.message && (
              <span className="text-danger1">{errors.email?.message}</span>
            )}
            <br></br>
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              inputRef={register({ required: true })}
              className="email"
              id="standard-basic"
              label="Password"
            />
            <HideOrShowPassword
              showPwd={(pwd) => {
                setShowPassword(pwd);
              }}
            />
            <br></br>
            {errors.password?.message && (
              <span className="text-danger4">{errors.password?.message}</span>
            )}
            <br></br>
            <FormControlLabel
                className="readme"
              control={<Checkbox value="members" color="primary" />}
              label="Remember me"
            onChange={onChangecheckbox}            
             
            />
            <br></br>
            <br></br>
            <Button
              type="submit"
              className="loginbutton"
              color="default"
              variant="contained"
            >
              Log in
            </Button>
            <br></br>&nbsp;
            <a className="forgatpassword11" href="/fotgotPassword">
              <p>Forgot your password? Click to reset</p>
            </a>
          </form>
        </div>
      </div>
      <div className="logincreatAccountPart">
        <a className="logincreatAccountPart1" href="/signup">
          <p>Don't have an account?</p>
        </a>
      </div>
      <p className="footer1">
        <span className="footer12">Trust Centre</span> <span className="footer12">Report a Violation</span>
        <span className="footer12">Careers</span>
      </p>
    </div>
  );
};

export default Login;
