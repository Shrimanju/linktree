import React, { Component, useState } from 'react';
import './Signup.css'
import fire from '../../Config/firebase';
import { useForm } from 'react-hook-form';
import Logo from '../../Assests/img/logo.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const Signup = () => {

    const { handleSubmit, register, errors } = useForm();
    const [ErrorMessage, setErrorMessage] = useState();
    const [ErrorMessageFirebase, setErrorMessageFirebase] = useState()
    const onSubmit = (data) => {
        if (data.password === data.confpassword) {
            setErrorMessage("")
            fire.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((u) => {
                    console.log(u);
                })
                .catch(err => {
                    setErrorMessageFirebase(err.message)
                    console.log(err);
                })
            console.log(data);
        } else {
            setErrorMessage("Password is not match")
        }
    };



    return (
        <div>
            <div className="logo">
                <img src={Logo} />&nbsp;
            <h1>Linktree</h1>
            </div>
            <div className="text-center text">
                <h4>Sign up for your Linktree account</h4>
            </div>

            <div className="loginPart text-center">
                <div className="formPart">
                    <div className="text-center">
                        <span className="text-danger">{ErrorMessageFirebase}</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <TextField
                            type="email"
                            name="email"
                            inputRef={register({ required: true })}
                            style={{ minWidth: '470px' }}
                            id="standard-basic"
                            label="Email" /><br></br>
                        {errors.email && <span className="text-danger">E-mail field is required</span>}
                        <br></br>
                        <TextField
                            type="text"
                            name="username"
                            inputRef={register({ required: true })}
                            style={{ minWidth: '470px' }}
                            id="standard-basic"
                            label="Username" /><br></br>
                        {errors.username && <span className="text-danger">Username field is required</span>}
                        <br></br>
                        <TextField
                            type="password"
                            name="password"
                            inputRef={register({ required: true })}
                            style={{ minWidth: '470px' }}
                            id="standard-basic"
                            label="Password" /><br></br>
                        {errors.password && <span className="text-danger">Password field is required</span>}
                        <br></br>
                        <TextField
                            type="password"
                            name="confpassword"
                            inputRef={register({ required: true })}
                            style={{ minWidth: '470px' }}
                            id="standard-basic"
                            label="Confirm Password" />
                        <br></br>
                        <span className="text-danger">{ErrorMessage}</span>

                        {errors.confpassword && <span className="text-danger">Confirm Password field is required</span>}
                        <br></br>
                        <br></br>
                        <Button type="submit" style={{ minWidth: '400px' }} color="default" variant="contained">Register</Button>

                    </form>
                </div>

            </div>
            <div className="creatAccountPart text-center">
                <p>By using this service you are agreeing to the terms of service and privacy policy</p>
                <h6>Already have an account?</h6>
            </div>
        </div>
    );
}

export default Signup;