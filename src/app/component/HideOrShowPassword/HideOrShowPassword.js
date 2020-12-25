import React, { useState } from "react";
// import a from "@material-ui/core";
import ShowPassword from "../../../Assets/showPassword2.png";
import HidePassword from "../../../Assets/hidePassword2.png";
import classes from "./hideOrShowPassword.module.css";
import { Label } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";

const HideOrShowPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  // const { handleSubmit, register, errors } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const clickhandler = () => {
    console.log("Show password", !showPassword);
    if (props.showPwd) {
      props.showPwd(!showPassword);
    }
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* <TextField
        type={showPassword ? "text" : "password"}
        name="password"
        // inputRef={register({ required: true })}
        style={{ minWidth: "470px" }}
        id="standard-basic"
        label="Password"
      />
      <br></br> */}
      {/* {errors.password?.message && (
        <span className="text-danger4">{errors.password?.message}</span>
      )} */}
      <div className={classes.container}>
        {!showPassword ? (
          <img
            className={classes.eyeIcon}
            src={ShowPassword}
            onClick={clickhandler}
          />
        ) : (
          <img
            src={HidePassword}
            onClick={clickhandler}
            className={classes.eyeIcon}
          />
        )}
      </div>
    </div>
  );
};

export default HideOrShowPassword;
