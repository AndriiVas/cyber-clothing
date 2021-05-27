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

export const createUserProfileDocument = async(userAuth, additionalData)=>{
  if(!userAuth)return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err){
      console.log('error creating user', err.message); 
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd)=>{
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj =>{
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap=(collections)=>{
  const transformedCollection = collections.docs.map(doc=>{
    const {title,items} = doc.data();
    return{
      routeName:encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


export const getCurrentUser = ()=>{
  return new Promise((resolve,reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve(userAuth);
    }, reject) 
  })
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

 export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=>auth.signInWithPopup(googleProvider);

export default firebase;
