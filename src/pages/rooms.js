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
    <section>rooms</section>
    <button id="patients-form">Cadastro de paciente</button>
  `
  const patients = []
  getPatients()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        patients.push({ ...doc.data(), id: doc.id });
      });
      printPatients(patients)
    })

  function printPatients(list) {
    container.querySelector("#all-patients").innerHTML = list.map(patient => {
      return `
        <li id=${patient.id}>
          <div>${patient.name}</div>
          <div>${patient.severity}</div>
        </li>
      `
    }).join("")
  }

  container.querySelector("#patients-form").addEventListener("click", () => {
    redirect("#patient-form")
  })
  return container
}