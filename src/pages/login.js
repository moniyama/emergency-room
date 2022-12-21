import { loginWithFirebase } from "../services/firebase.js"
import { redirect } from "../utils.js"

export default function () {
  const container = document.createElement("section")
  container.classList.add("main")
  container.classList.add("flex")

  container.innerHTML = `
    <div class="column flex margin-top">
      <input id="email" type="email" placeholder="email">
      <input id="password" type="password" placeholder="password">
      <button id="btn-login">LOGIN</button>
      <button id="btn-sign-up">Cadastre-se AQUI</button>
    </div>
  `

  container.querySelector("#btn-login").addEventListener("click", () => {
    const email = container.querySelector("#email").value
    const password = container.querySelector("#password").value
    loginWithFirebase(email, password)
      .then(() => redirect("#tele"))
  })

  container.querySelector("#btn-sign-up").addEventListener("click", () => {
    redirect("#signup")
  })

  return container
}