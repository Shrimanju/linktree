import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { auth } from '../../../Firebase_config/firebase';


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function AccountPopover(props) {
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
                <Typography className={classes.typography}><Button onClick={logout}>Logout</Button></Typography>
            </Popover>
        </div>
    );
}