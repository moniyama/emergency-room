import { addPatient } from "../services/firebase.js"
import { redirect } from "../utils.js"

export default function () {
  const container = document.createElement("div")

  container.innerHTML = `
    <form id="form">
      <label for="name">Nome completo</label>
      <input id="name" type="text">
      <label for="age">Idade</label>
      <input id="age" type="number">
      <label for="gender">Genero</label>
      <select id="gender">
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
        <option value="not declared">Não declarado</option>
      </select>
      <label for="description">Descrição</label>
      <textarea id="description"></textarea>
      <label for="severity">Gravidade da lesão</label>
      <select id="severity">
        <option value="esi1">ESI 1 Grave</option>
        <option value="esi2">ESI 2 Gravidade mediana</option>
        <option value="esi3">ESI 3 Menos grave</option>
        <option value="esi4">ESI 4 Leve</option>
        <option value="esi5">ESI 5 Atenção geral</option>
      </select>
      <button id="add-patient">Adicionar</button>
      <button id="tele">Voltar</button>
    </form>
  `

  container.querySelector("#add-patient").addEventListener("click", (e) => {
    e.preventDefault()
    const patient = {
      name: container.querySelector("#name").value,
      age: container.querySelector("#age").value,
      gender: container.querySelector("#gender").value,
      description: container.querySelector("#description").value,
      severity: container.querySelector("#severity").value,
      attended: false
    }
    addPatient(patient)
      .then(() => {
        container.querySelector("#form").reset()
      })
  })

  container.querySelector("#tele").addEventListener("click", (e) => {
    e.preventDefault()
    redirect("#tele")
  })

  return container
}