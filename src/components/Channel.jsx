import React, {useState,useEffect,useRef} from 'react';
import firebase from 'firebase/app';
import Message from './Message';

function Channel({user=null,db=null}) {
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState('');
    const {uid, displayName, photoURL}=user;
    const bottomListRef = useRef();

    useEffect(()=>{
        if(db){
            const unsubscribe = db
            .collection('messages')
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot((querySnapshot)=>{
                const data=querySnapshot.docs.map(doc=>{
                        return {
                        ...doc.data(),
                        id: doc.id
                    };
                });
                //update messages array 
                setMessages(data); 
            });
            //Detach listener
            return unsubscribe;
        }
    },[db]);

    function handleOnChange(e){
        setNewMessage(e.target.value);
    }

    function handleOnSubmit(e){
        e.preventDefault();

        if(db){
            db.collection('messages').add({
                text:newMessage,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                uid:uid,
                displayName:displayName,
                photoURL:photoURL
            });
        }
        setNewMessage('');
        bottomListRef.current.scrollIntoView({block:'end', behavior: 'smooth' });
    }

    return (
        <div className="container">
          
                {messages.map(message => {
                    return <div className="chat-div" key={message.id}><Message {...message}/></div>
                })}
        
            <form  onSubmit={handleOnSubmit}>
            <input ref={bottomListRef} type="text" value={newMessage} onChange={handleOnChange} placeholder="Type your message here..."/>
            <button className="send-btn" type="submit" disabled={!newMessage}>SEND</button>
            </form>
        </div>
    );
}

export default Channel;