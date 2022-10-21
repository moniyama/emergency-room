import { redirect } from "../utils.js"
import { getPatients } from "../services/firebase.js"

export default function () {
  const container = document.createElement("section")

  container.innerHTML = `
    <h1>rooms</h1>
    <aside> 
      <h1>Lista de espera</h1>
      <ul id="all-patients"></ul>
    </aside>
    <section>
      <h1>rooms</h1>
      <ul id="all-rooms">
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

  container.querySelectorAll(".next-patient").forEach(el => el.addEventListener("click", (e) => {
    const nextPatient = container.querySelector(".patient")
    if (nextPatient) {
      e.currentTarget.previousElementSibling.prepend(nextPatient)
    }
    const thisRoomPatient = e.currentTarget.previousElementSibling.children
    const clickedRoomHasAlreadyOnePatient = thisRoomPatient.length > 1
    if (clickedRoomHasAlreadyOnePatient) {
      thisRoomPatient[1].remove()
    }
  }))

  container.querySelector("#patients-form").addEventListener("click", () => {
    redirect("#patient-form")
  })

  container.querySelector("#update-patient-list").addEventListener("click", showPatientsList)
  return container
}