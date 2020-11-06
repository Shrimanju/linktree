import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import classes from '../MobileView/MobileView.module.css';
import MobileContainer from './MobileContainer/MobileContainer';
import db, { auth } from '../../../Firebase_config/firebase';

const MobileView = () =>{
    const {mylinkid} = useParams();
    const [username,setUsername] = useState();
    const [userError,setUserError] = useState();
    const [databaseError,setDatabaseError] = useState();

    useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).get()
        .then((doc)=>{
            if(doc.exists){
                setUsername(doc.data().username);
            }
            else{
                setUserError('No such information present');
            }
        })
        .catch((error)=>{
            setDatabaseError(error);
        })
    }, [])

    return(
        <div className={classes.container}>
            <div className={classes.mobileheader}>
                <span>My Link : <Link to={`/${username}`}   className={classes.link}> @{username}</Link></span>
                <button className='btn btn-light'>Share</button>
            </div>
            <div className={classes.mobilebody}>
                <MobileContainer user = {username}/>
            </div>
        </div>
    );
}

export default MobileView;