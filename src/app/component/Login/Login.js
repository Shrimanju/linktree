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
import * as yup from 'yup';

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
  

  const onSubmit = (data) => {
    setErrorMessages("");

    firebaseApp
    .auth()
      .signInWithEmailAndPassword(data.email, data.password)
    
      .then((u) => {
        console.log(u);
      })

      .catch(function (error) {
        // Handle Errors here.
        setErrorMessages(error.message);
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error({ ErrorCode: errorCode, ErrorMessage: errorMessage });
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        }
        else {
            alert(errorMessage);
        }
        console.log(error);
    });
      // .catch((err) => {
      //   setErrorMessages(err.message);
      //   console.log(err);
      // });
  };

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
            startIcon={<InstagramIcon />}
          >
            <span> Sign in with Instagram </span>
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
