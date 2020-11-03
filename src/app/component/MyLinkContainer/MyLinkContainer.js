import { Button } from '@material-ui/core';
import React from 'react';
import classes from '../MyLinkContainer/MyLinkContainer.module.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function MyLinkContainer(props) {
    return (
        <div className={classes.MyLinkContainer}>
            <a className="btn btn-outline-success w-100 p-3" href={props.url} role="button" target="_blank">{props.title}</a>
        </div>
    )
}

export default MyLinkContainer;
