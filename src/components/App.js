import React, {useState,useEffect} from 'react';

//import components
import Button from './Button';
import Channel from './Channel';

//firebase deps
import firebase from 'firebase/app'; //import firebase SDK
import 'firebase/auth';// for authentication
import 'firebase/firestore';// for database


//initialise firebase in our app passing in the firebase project Configuration
// my web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCACu6Lb-_AuGjiGPgszKHb6F-B2od9_Po",
  authDomain: "one-chat-65416.firebaseapp.com",
  projectId: "one-chat-65416",
  storageBucket: "one-chat-65416.appspot.com",
  messagingSenderId: "35912878437",
  appId: "1:35912878437:web:f49b969160382a4412398c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const db=firebase.firestore();

function App() {

  const [user,setUser]=useState(()=>auth.currentUser); //We can quickly get the current user using the currentUser property
  const [initializing,setInitializing] = useState(true);

  useEffect(()=>{
    //onAuthStateChanged helps you to subscribe given user's current authentication state 
    //and receive an event whenever the user's authentication state changes.
    //This method returns a fucntion which we can use to cleanup our subscription whenever our component unmounts
    //The onAuthStateChanged is asyncronous function and will trigger initial state only when
    //the connection with firebase has been established
    const unsubscribe=auth.onAuthStateChanged (user=>{
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });
   return unsubscribe; 
  },[]);
  
  function signInWithGoogle(){
    //Create an instance of the Google provider object:
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      console.log(result);
    }).catch((error) => {
      // Handle Error here.
      console.log(error);
    });
  }

  if(initializing)return"Loading...";

  function signOut(){
    auth.signOut().then(() => {
      //As we already have set up a listener for any authentication changes
      //The user's state should be updated automatically and set to null
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
    {user ? (
      <div>
        <div className="navbar"><i class="fas fa-poo-storm" style={{"fontSize":"48px","color":"	 #b3ff1a","padding":"1rem"}}></i><Button css="signOut" icon={false} handleClick={signOut} buttonName="Sign Out"/></div>
        <h1>Welcome to the chat</h1>
        <div style={{"paddingTop":"3rem","paddingBottom":"1rem"}}>   <p style={{"textAlign": "center","letterSpacing":"4px","fontWeight":"lighter"}}>The chat begins here ...</p></div>
        <Channel user={user} db={db}/>
      </div>
 
    ):(
      
      <div className="welcome">
        <h1><i class="fas fa-poo-storm" style={{"fontSize":"48px","color":"	 #b3ff1a","padding":"1rem"}}></i> One Channel Chat</h1>
        <Button handleClick={signInWithGoogle} 
        icon={true}
        buttonName="Sign in with Google"
        css="signin"/>
      </div>
    )

    }
    </div>
  );
}

export default App;
