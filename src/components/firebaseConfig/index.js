import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyApm0UL76BHxiC36wzJZRCxQH0tsfMlOPU",

    authDomain: "ecell-d5d2c.firebaseapp.com",

    databaseURL:
      "https://ecell-d5d2c-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "ecell-d5d2c",

    storageBucket: "ecell-d5d2c.appspot.com",

    messagingSenderId: "443301337374",

    appId: "1:443301337374:web:1c055dab09946ba6e9110f",

    measurementId: "G-H31BLZLNGT",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default StartFirebase;
