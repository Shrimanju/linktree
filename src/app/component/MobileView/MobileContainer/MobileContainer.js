import React, { useState } from 'react';
import classes from '../MobileContainer/MobileContainer.module.css';
import MobileContainerView from './MobileContainerView/MobileContainer.View';
import db,{auth} from '../../../../Firebase_config/firebase';
import {Avatar} from '@material-ui/core';
import { useEffect } from 'react';

const MobileContainer = (props) =>{
    const [links, setlinks] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(auth.currentUser.uid).collection('links').onSnapshot((snapshot)=>
            setlinks(snapshot.docs.map((doc)=>({
                id : doc.id,
                data : doc.data(),
            })))
        );

        return () =>{
            unsubscribe();
        }
    }, [])

    return(
        <div className={classes.container}>
            <div className={classes.container_heading}>
                <Avatar className={classes.avatar}/>
                <span>@{props.user}</span>
            </div>
            {links.map((link) => (
                <MobileContainerView key={link.id} id={link.id} title={link.data.title} />
            ))}
        </div>
    );
}

export default MobileContainer;