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
    q = query(collection(db, "patients"), where("appointment.attended", "==", false), where("appointment.room", "==", null), orderBy("severity", "asc"));
  }
  if (status === "progress") {
    q = query(collection(db, "patients"), where("appointment.attended", "==", false), where("appointment.room", "!=", null));
  }
  return getDocs(q);
}

export function updatePatient(status, patientID) {
  const { appointment, room } = status;
  let update;
  if (appointment === "start") {
    console.log("start");
    update = {
      "appointment.room": room,
      "appointment.startDate": new Date(Date.now())
    }
  }
  if (appointment === "end") {
    console.log("end");

    update = {
      "appointment.attended": true,
      "appointment.endDate": new Date(Date.now())
    }
  }
  return updateDoc(doc(db, "patients", patientID), update);
}
