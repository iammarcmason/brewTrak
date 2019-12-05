import firebase from 'firebase';
import 'firebase/firestore';
require('firebase/auth');
require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyDTIJaUz2UxTPldscc-8nLjWBiy4nXZmvw',
  authDomain: 'brewtrack-mm.firebaseapp.com',
  databaseURL: 'https://brewtrack-mm.firebaseio.com',
  projectId: 'brewtrack-mm',
  storageBucket: 'brewtrack-mm.appspot.com',
  messagingSenderId: '713707476077',
  appId: '1:713707476077:web:88e47d51632ee0e5f5db64',
  measurementId: 'G-ERE9RKS6CB'
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  // timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const brewsCollection = db.collection('brews');
const ingredientsCollection = db.collection('ingredients');
const equipmentCollection = db.collection('equipment');

export {
  db,
  auth,
  currentUser,
  usersCollection,
  brewsCollection,
  ingredientsCollection,
  equipmentCollection
};
