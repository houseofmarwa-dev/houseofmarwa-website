// REPLACE WITH YOUR OWN FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIza.....",
  authDomain: "houseofmarwa.firebaseapp.com",
  projectId: "houseofmarwa",
  storageBucket: "houseofmarwa.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123:web:456"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
