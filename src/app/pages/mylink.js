import React, { useEffect, useState } from 'react';
import {Avatar} from '@material-ui/core';
import classes from '../../styles/MyLink/Mylink.module.css';
import db from '../../Firebase_config/firebase';
import MyLinkContainer from '../component/MyLinkContainer/MyLinkContainer';

function Mylink() {
    const[linkList,setLinkList] = useState([]);

    useEffect(() => {
        db.collection('links').onSnapshot((snapshot)=>
            setLinkList(snapshot.docs.map((doc)=>({
                id : doc.id,
                data : doc.data(),
            })))
        )
    }, [])

    return (
        <div className={classes.mylink_container}>
            <div className={classes.header}>
                <Avatar className={classes.avatar} />
                <span>@Gopal1926</span>
            </div>
            <div className={classes.body}>
                {
                    linkList.map((link)=>{
                        return <MyLinkContainer title={link.data.title} url = {link.data.url}/>;
                    })
                }                                
            </div>
            <div className={classes.footer}>

            </div>
        </div>
    )
}

export default Mylink;
