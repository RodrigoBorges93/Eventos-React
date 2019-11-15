import firebase from 'firebase';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBiugnYuJBdKX0JMy8LvKfXNRzOtCxpw6Q",
    authDomain: "eventos-c0979.firebaseapp.com",
    databaseURL: "https://eventos-c0979.firebaseio.com",
    projectId: "eventos-c0979",
    storageBucket: "eventos-c0979.appspot.com",
    messagingSenderId: "137973985897",
    appId: "1:137973985897:web:fc3418c2ebdef08c0c68f8"
  };
  // Initialize Firebase

export default firebase.initializeApp(firebaseConfig);
