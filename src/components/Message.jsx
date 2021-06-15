import React from 'react';
import {formatRelative} from 'date-fns';

function Message({
    createdAt=null,
    text='',
    displayName='',
    photoURL=''
}){
    return (
        <div className="row">
            <div className="col">
                {photoURL?(<img src={photoURL} alt="Avatar" width={45} height={45}/>):null}
            </div>
            <div className="col">
                {displayName?<span className="display-name">{displayName}</span>:null}
                {createdAt?<span style={{"fontWeight":"lighter"}}>{formatRelative(new Date(createdAt.seconds*1000),new Date())}</span>:null}
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Message;