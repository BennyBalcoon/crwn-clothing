import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDgmUuiVdWgT_5SFzb-XWTLrd7MoqRujuk',
  authDomain: 'crwn-db-d0fcf.firebaseapp.com',
  databaseURL: 'https://crwn-db-d0fcf.firebaseio.com',
  projectId: 'crwn-db-d0fcf',
  storageBucket: 'crwn-db-d0fcf.appspot.com',
  messagingSenderId: '752996712074',
  appId: '1:752996712074:web:e1ecbfce794cac3a053773',
  measurementId: 'G-KBTGL2K40E',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  // console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
