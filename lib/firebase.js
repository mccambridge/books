import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3QGmnKPVL1ExaBd5Af5DI2zJvY9V_IFQ",
  authDomain: "books-2c622.firebaseapp.com",
  projectId: "books-2c622",
  storageBucket: "books-2c622.appspot.com",
  messagingSenderId: "29330818570",
  appId: "1:29330818570:web:f0f644cc2b7b176b40c1f3",
  measurementId: "G-ZWT9YPKKX3"
};

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export async function getDesignWithSlug(slug) {
  const designsRef = firestore.collection('designs');
  const query = designsRef.where('slug', '==', slug).limit(1);
  const designDoc = (await query.get()).docs[0];
  return designDoc;
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const GeoPoint = firebase.firestore.GeoPoint;

/**`
 * Converts an activity document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function activityToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    eventTime: data.eventTime.toMillis(),
  };
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    // eventTime: data.eventTime.toMillis(),
  };
}

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();
  export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();