import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyCAOs6dWrVy0--22SKKlo2_voktmMfa5E8",
        authDomain: "crwn-db-f0937.firebaseapp.com",
        projectId: "crwn-db-f0937",
        storageBucket: "crwn-db-f0937.appspot.com",
        messagingSenderId: "986766208430",
        appId: "1:986766208430:web:1c3fa8aa25c9e7a0266c3f",
        measurementId: "G-JG7HWTJJVB"
      };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

export default firebase;
