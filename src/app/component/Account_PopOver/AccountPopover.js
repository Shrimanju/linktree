import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import db, { auth } from '../../../Firebase_config/firebase';
import { useEffect,useState } from 'react';
import { CenterFocusStrong } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
        alignContent:'center',
        alignItems:'center',
    },
}));

export default function AccountPopover(props) {
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

    const classes = useStyles();

    const logout = () => {
        auth.signOut();
    }

    return (
        <div>
            <Popover
                id={props.id}
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Typography className={classes.typography}>
                    <span>My Account : @{username}</span><br />
                    <Button onClick={logout}>Logout</Button>
                </Typography>
            </Popover>
        </div>
    );
}