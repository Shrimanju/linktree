import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LinkContainer from '../component/LinkContainer/LinkContainer';
import classes from '../../styles/Links/Links.module.css';
import db,{auth} from '../../Firebase_config/firebase';

const Link = () =>{

    const [links, setlinks] = useState([]);

    const [linkIndex,setLinkIndex] = useState([]);

    useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).collection('links').onSnapshot((snapshot) =>
            setlinks(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        )

        db.collection('users').doc(auth.currentUser.uid).collection('links').onSnapshot((snapshot)=>{
                if(snapshot.docs.length > 0){
                    setLinkIndex(snapshot.docs.map((doc) =>  ({
                        id : doc.data().id,
                        title : doc.data().title,
                        url : doc.data().url,
                    })))
                }
                else{
                    setLinkIndex([{id : 45.67}])
                }
            })
    }, [])


    const LinkAddHandler = () => {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        setLinkIndex((olditem) => {
            return [...olditem, {id:rand}];
        });
    }

    const setLinkData = (title,url,index) =>{
        db.collection('users').doc(auth.currentUser.uid).collection('links').add({
            id: index,
            title: title,
            url: url,
        })
    }

    const onLinkDelete = (id) =>{
        setLinkIndex((olditem)=>{
            return olditem.filter((index)=>{
                return index.id !== id;
            })
        });


        links.map((link)=>{
            if(link.data.id === id){
                db.collection('users').doc(auth.currentUser.uid).collection('links').doc(link.id).delete();
            }
        })
    }

    return(
        <div className={classes.link_body}>
            <btn className='btn btn-primary w-100 rounded-pill p-3' onClick={LinkAddHandler}>Add Link</btn>
            {linkIndex.map((index)=> {
                return (
                    <LinkContainer
                        key={index.id}
                        id={index.id}
                        data={setLinkData}
                        onDelete = {onLinkDelete}
                        title = {index.title}
                        url = {index.url}
                    />
                );
            })}
        </div>
    );
}

export default Link;