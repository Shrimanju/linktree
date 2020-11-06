import React, { useEffect, useState } from 'react';
import {Avatar} from '@material-ui/core';
import classes from '../../styles/MyLink/Mylink.module.css';
import MyLinkContainer from '../component/MyLinkContainer/MyLinkContainer';
import db, { auth } from '../../Firebase_config/firebase';

function Mylink() {

    const [username,setUsername] = useState();

    const [links, setlinks] = useState([]);

    useEffect(() => {

        db.collection('users').doc(auth.currentUser.uid).get()
        .then((doc)=>{
            if(doc.exists){
                setUsername(doc.data().username);
            }
            else{
                console.log('Error in document');
            }
        })
        .catch((error)=>{
            console.log(error);
        })

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

    return (
        <div className={classes.mylink_container}>
            <div className={classes.header}>
                <Avatar className={classes.avatar} />
                <span>@{username}</span>
            </div>
            <div className={classes.body}>
                {
                    links.map((link) => {
                        return <MyLinkContainer title={link.data.title} url={link.data.url} />;
                    })
                }
            </div>
            <div className={classes.footer}>

            </div>
        </div>
    )
}

export default Mylink;
