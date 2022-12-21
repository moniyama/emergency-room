import { createAccountWithFirebase } from "../services/firebase.js"
import { redirect } from "../utils.js"

export default function () {
  const container = document.createElement("section")
  container.classList.add("main")
  container.classList.add("flex")

  container.innerHTML = `
    <div class="column flex margin-top">
      <input id="email" type="email" placeholder="email">
      <input id="password" type="password" placeholder="password">
      <button id="btn-back">VOLTAR</button>
      <button id="btn-sign-up">Cadastrar</button>
    </div>
  `

  container.querySelector("#btn-sign-up").addEventListener("click", () => {
    const email = container.querySelector("#email").value
    const password = container.querySelector("#password").value
    createAccountWithFirebase(email, password)
      .then(() => redirect("#tele"))
  })

  container.querySelector("#btn-back").addEventListener("click", () => {
    redirect("#login")
  })

  return container
}