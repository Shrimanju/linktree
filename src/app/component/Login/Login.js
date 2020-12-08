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

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const [ErrorMessages, setErrorMessages] = useState();

  const onSubmit = (data) => {
    setErrorMessages("");
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        setErrorMessages(err.message);
        console.log(err);
      });
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
          <span className="text-danger">{ErrorMessages}</span>
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
            {errors.email && (
              <span className="text-danger">E-mail field is required</span>
            )}
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
            {errors.password && (
              <span className="text-danger">Password field is required</span>
            )}
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
