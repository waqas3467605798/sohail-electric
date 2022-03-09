import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'



// const firebaseConfig = {
//   apiKey: "AIzaSyAdKUeFJLeL5XucfpcHErO0j6Jw0PGH_sQ",
//   authDomain: "sohail-electric.firebaseapp.com",
//   projectId: "sohail-electric",
//   storageBucket: "sohail-electric.appspot.com",
//   messagingSenderId: "106332622374",
//   appId: "1:106332622374:web:a30efebd71659131d0a0e7",
//   measurementId: "G-N0E6ZPE8Z6"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCri9N8uwpTpBFmr5RGITpH1tUrlLjMKBk",
  authDomain: "myledgers-5c8bc.firebaseapp.com",
  databaseURL: "https://myledgers-5c8bc-default-rtdb.firebaseio.com",
  projectId: "myledgers-5c8bc",
  storageBucket: "myledgers-5c8bc.appspot.com",
  messagingSenderId: "370025177031",
  appId: "1:370025177031:web:832c3f9a032226e9cd83e2",
  measurementId: "G-L26JFRZLKN"
};




  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


export default firebase;




//  className={item.debit >= 0 ? 'ldgrPostveAmt' : 'ldgrNegtveAmt'}



    // apiKey: "AIzaSyCRKceXGhdhpKFQiAJ2Qgkb1wXgXbI36RQ",
    // authDomain: "ngrpractice.firebaseapp.com",
    // projectId: "ngrpractice",
    // storageBucket: "ngrpractice.appspot.com",
    // messagingSenderId: "384804225359",
    // appId: "1:384804225359:web:d1c84f17b1de731c99853a",
    // measurementId: "G-NKKRC8FGHL"