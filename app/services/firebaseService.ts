import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAxYuzc9CXsylJ3Crmx3JSjwOn34X7bwmA",
    authDomain: "bdg-queue.firebaseapp.com",
    projectId: "bdg-queue",
    storageBucket: "bdg-queue.firebasestorage.app",
    messagingSenderId: "713619359676",
    appId: "1:713619359676:web:64b7ecd92d625333c38db9",
    measurementId: "G-R8VM8MGTRJ"
};

const app = initializeApp(firebaseConfig);
//getAnalytics(app);
export const dbFirestore = getFirestore(app);
export const dbCollection = (docPath: string) => collection(dbFirestore, docPath);
