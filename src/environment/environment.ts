// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyAXWTYmLGrFHqSeSfJmnOryyLtAXMfRTCw',
  authDomain: 'message-table-56e67.firebaseapp.com',
  projectId: 'message-table-56e67',
  storageBucket: 'message-table-56e67.appspot.com',
  messagingSenderId: '103850090635',
  appId: '1:103850090635:web:daa28e9dc5093db268f48e',
  measurementId: 'G-04VN7TSPXH',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
