import { redirect } from "../utils.js"
import { getPatients, updatePatient } from "../services/firebase.js";

export default function () {
  const container = document.createElement("section")
  container.classList.add("main")

  container.innerHTML = `
    <div class="flex space-between margin-top">
      <section class="rooms">
        <ul id="all-rooms" class="flex space-between all-rooms"></ul>
      </section>
      <aside class="aside center"> 
        <h1>Lista de espera</h1>
        <ul id="all-patients"></ul>
      </aside>
    </div>
    <section class="margin-side btn-section flex space-between">
      <button id="patients-form">Cadastro de paciente</button>
      <button id="update-patient-list">Atualizar lista</button>
    </section>
    `

  const patientWaitingList = []
  const patientRoomList = []
  const NUMBERSOFROOMS = 9

  showPatientWaitingList()
  showRooms(NUMBERSOFROOMS)

  function showPatientWaitingList() {
    patientWaitingList.length = 0
    const waitingListContainer = container.querySelector("#all-patients")
    getPatients("waiting")
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          patientWaitingList.push({ ...doc.data(), id: doc.id });
        });
        waitingListContainer.innerHTML = patientWaitingList
          .map(patient => patientTemplate(patient)).join("")
      })
  }

  function showRooms(number) {
    getPatients("progress")
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          patientRoomList.push({ ...doc.data(), id: doc.id });
        })
        printRooms(number, patientRoomList)
      })

    function printRooms(quantity, patientsList) {
      let result = ""
      let count = 0
      while (count < quantity) {
        count++
        const hasPatientInRoom = patientsList.filter(patient => patient.appointment.room === count)
        if (hasPatientInRoom) {
          result += roomTemplate(count, hasPatientInRoom[0])
        } else {
          result += roomTemplate(count)
        }
      }
      container.querySelector("#all-rooms").innerHTML = result
    }
  }

  function patientTemplate(patient) {
    return `
      <li class="patient center ${patient.severity}" id=${patient.id}>
        <div > ${patient.name}</div >
        <div>${patient.severity}</div>
      </li>
    `
  }

  function roomTemplate(number, patient = {}) {
    return `
      <li class= "room flex column space-between center">
        <h2>Sala ${number}</h2>
        ${patient.name
        ? `<ul>${patientTemplate(patient)}</ul>`
        : "<div></div>"}
        <button class= "next-patient"> proximo</button>
      </li >
    `
  }

  container.addEventListener("click", (e) => {
    const nextPatientBtn = e.target.classList.contains("next-patient")
    const newPatientBtn = e.target.id === "patients-form"
    const updatePatientsListBtn = e.target.id === "update-patient-list"

    if (nextPatientBtn) {
      const nextPatient = container.querySelector("#all-patients").firstElementChild
      const actualPatient = e.target.previousElementSibling
      if (nextPatient) {
        const hasPatient = actualPatient.id
        const room = Number(e.target.parentElement.firstElementChild.textContent.substring(4))
        updatePatient({ appointment: "start", room }, nextPatient.id)
        actualPatient.replaceWith(nextPatient)
        if (hasPatient) {
          updatePatient({ appointment: "end" }, actualPatient.id)
        }
      }
    }
    if (newPatientBtn) {
      redirect("#patient-form")
    }
    if (updatePatientsListBtn) {
      showPatientWaitingList()
    }
  })

  return container
}