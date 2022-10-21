import { auth } from "./firebase-config.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

export function loginWithFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function createAccountWithFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const isLoggedUser = async () => await auth.currentUser