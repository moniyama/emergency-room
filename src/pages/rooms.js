import { redirect } from "../utils.js"
import { getPatients, updatePatientAttending } from "../services/firebase.js";

export default function () {
  const container = document.createElement("section")

  container.innerHTML = `
    <div class="flex space-evenly main margin-top">
      <section class="rooms">
        <ul id="all-rooms" class="flex space-evenly">
          <li class="room">
            <h2>Room 1</h2>
            <div></div>
            <button class="next-patient">proximo</button>
          </li>
          <li class="room">
            <h2>Room 2</h2>
            <div></div>
            <button class="next-patient">proximo</button>
          </li>
        </ul>
      </section>
      <aside class="aside"> 
        <h1>Lista de espera</h1>
        <ul id="all-patients"></ul>
      </aside>
    </div>
    <button id="patients-form">Cadastro de paciente</button>
    <button id="update-patient-list">Atualizar lista</button>
    `
  const patients = []
  const rooms = [] // [{ number: 1, user: {} }, { number: 2, user: {} }]

  showPatientsList()

  function showPatientsList() {
    patients.length = 0
    getPatients()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          patients.push({ ...doc.data(), id: doc.id });
        });
        printPatients(patients)
      })
  }

  function printPatients(list) {
    container.querySelector("#all-patients").innerHTML = list.map(patient => {
      return `
        <li class="patient" id=${patient.id}>
          <div>${patient.name}</div>
          <div>${patient.severity}</div>
        </li>
      `
    }).join("")
  }

  function printRooms(list) {
    container.querySelector("#all-rooms").innerHTML = list.map(room => {
      return `
        <li class="room">
          <h2>Room ${room.number}</h2>
          <div>${room.user.name}</div>
        </li>    
      `
    }).join("")
  }

  container.addEventListener("click", (e) => {
    const nextPatientBtn = e.target.classList.contains("next-patient")
    const newPatientBtn = e.target.id === "patients-form"
    const updatePatientsListBtn = e.target.id === "update-patient-list"

    if (nextPatientBtn) {
      const nextPatient = container.querySelector("#all-patients").firstElementChild
      const actualPatient = e.target.previousElementSibling
      if (nextPatient) {
        if (actualPatient.id) {
          updatePatientAttending(actualPatient.id)
        }
        actualPatient.replaceWith(nextPatient)
      }
    }
    if (newPatientBtn) {
      redirect("#patient-form")
    }
    if (updatePatientsListBtn) {
      showPatientsList()
    }
  })

  return container
}