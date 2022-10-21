import { redirect } from "../utils.js"

export default function () {
  const container = document.createElement("section")

  container.innerHTML = `
    <h1>rooms</h1>
    <button id="patients-form">Cadastro de paciente</button>
  `

  container.querySelector("#patients-form").addEventListener("click", () => {
    redirect("#patient-form")
  })
  return container
}