import { createAccountWithFirebase } from "../services/firebase.js"
import { redirect, showError } from "../utils.js"

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

  container.addEventListener("click", (event) => {
    const { target } = event
    const isSignUpButton = target.id === "btn-sign-up"
    const isBackButton = target.id === "btn-back"

    if (isSignUpButton) {
      const email = container.querySelector("#email").value
      const password = container.querySelector("#password").value
      createAccountWithFirebase(email, password)
        .then(() => redirect("#tele"))
        .catch(err => {
          const hasError = container.querySelector(".error")
          if (!hasError) {
            container.firstElementChild.appendChild(showError(err.message))
          } else {
            hasError.innerHTML = err.message
          }
        })
    }
    if (isBackButton) {
      redirect("#login")
    }
  })

  return container
}