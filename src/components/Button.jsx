import React from 'react';

function Button(props) {
    return ( 
        <button onClick={props.handleClick} className={props.css}> {props.icon?(<img className="googleImgIcon" src="/google.png" width="24px" height="24px"/>):("")} { props.buttonName }</button> 
    );
}

export default Button;

