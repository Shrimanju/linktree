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
    <div>
      <div className="logo">
        <img src={Logo} />
        &nbsp;
        <h1>Linktree</h1>
      </div>

      <div className="text-center text">
        <h4>Log in to continue to your Linktree admin</h4>
      </div>

      <div className="loginPart text-center" style={{ height: "500px" }}>
        <div className="instaButton">
          <Button
            style={{ minWidth: "400px" }}
            color="default"
            variant="contained"
            startIcon={<InstagramIcon />}
          >
            Instagram
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
              style={{ minWidth: "470px" }}
              id="standard-basic"
              label="E-mail"
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
              Login
            </Button>
            <br></br>&nbsp;
            <p>Forgot your password? Click to reset</p>
          </form>
        </div>
      </div>
      <div className="creatAccountPart text-center">
        <a href="/signup">
          <p>Don't have an account?</p>
        </a>
      </div>
    </div>
  );
};

export default Login;
