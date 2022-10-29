import { auth, db } from "./firebase-config.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { addDoc, collection, query, orderBy, getDocs, where, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

export function loginWithFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function createAccountWithFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const isLoggedUser = async () => await auth.currentUser

export function addPatient(patient) {
  return addDoc(collection(db, "patients"), patient);
}

export function getPatients(status) {
  let q;
  if (status === "waiting") {
    q = query(collection(db, "patients"), where("appointment.attended", "==", false), orderBy("severity", "asc"));
  }
  if (status === "progress") {
    q = query(collection(db, "patients"), where("appointment.attended", "==", false), where("appointment.room", "!=", null));
  }
  return getDocs(q);
}

export function updatePatientAttending(patientID) {
  return updateDoc(doc(db, "patients", patientID), {
    attended: true
  });
}
