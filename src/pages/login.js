import { loginWithFirebase, createAccountWithFirebase } from "../services/firebase.js"
import { redirect } from "../utils.js"

export default function () {
  const container = document.createElement("section")
  container.innerHTML = `
    <input type="email" placeholder="email">
    <input type="password" placeholder="password">
    <button id="btn-login">LOGIN</button>
    <button id="btn-sign-up">Cadastrar</button>
  `

  container.querySelector("#btn-login").addEventListener("click", () => {
    loginWithFirebase()
      .then(() => redirect("#tele"))
  })

  container.querySelector("#btn-sign-up").addEventListener("click", () => {
    createAccountWithFirebase()
      .then(() => redirect("#tele"))
  })
  return container
}