import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LinkContainer from '../component/LinkContainer/LinkContainer';
import classes from '../../styles/Links/Links.module.css';
import db,{auth, firebaseApp} from '../../Firebase_config/firebase';
import firebase from 'firebase';

const Link = () =>{

    const [links, setlinks] = useState([]);

    useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).collection('links').orderBy('timestamp','desc').onSnapshot((snapshot) =>
            setlinks(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        )
    }, [])


    const LinkAddHandler = () => {
        db.collection('users').doc(auth.currentUser.uid).collection('links').add({ 
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    const setLinkData = (title,url,index,timestamp,checked) =>{
        db.collection('users').doc(auth.currentUser.uid).collection('links').doc(index).set({
            timestamp : timestamp,
            title : title,
            url : url,
            isactive : checked,
        })
    }

    const onLinkDelete = (id) =>{
        links.map((link)=>{
            if(link.id === id){
                db.collection('users').doc(auth.currentUser.uid).collection('links').doc(link.id).delete();
            }
        })
    }

    return(
        <div className={classes.link_body}>
            <button className='btn btn-primary w-100 rounded-pill p-3' onClick={LinkAddHandler}>Add Link</button>
            {links.map((link)=> {
                return (
                    <LinkContainer
                        key={link.id}
                        id={link.id}
                        linkData={setLinkData}
                        onDelete = {onLinkDelete}
                        title = {link.data.title}
                        url = {link.data.url}
                        timestamp = {link.data.timestamp}
                        isactive = {link.data.isactive}
                    />
                );
            })}
        </div>
    );
}

export default Link;