// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrML1ihTDGhZLraIy0yHUTaEkV0LU8UQ0',
  authDomain: 'ecommerce-c55ac.firebaseapp.com',
  projectId: 'ecommerce-c55ac',
  storageBucket: 'ecommerce-c55ac.appspot.com',
  messagingSenderId: '345800227754',
  appId: '1:345800227754:web:bc094c638af56a8c3f09d3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
