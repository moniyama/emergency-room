import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnN8jEliqpiUuBlAPi1co2WenFASfmFYA",
  authDomain: "emergency-room-bb183.firebaseapp.com",
  projectId: "emergency-room-bb183",
  storageBucket: "emergency-room-bb183.appspot.com",
  messagingSenderId: "952496921532",
  appId: "1:952496921532:web:99e282ead7ddff9b4a69b9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
