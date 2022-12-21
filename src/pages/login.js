import { loginWithFirebase } from "../services/firebase.js"
import { redirect, showError } from "../utils.js"

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

  container.addEventListener("click", (event) => {
    const { target } = event
    const isSignInButton = target.id === "btn-login"
    const isSignUpButton = target.id === "btn-sign-up"

    if (isSignInButton) {
      const email = container.querySelector("#email").value
      const password = container.querySelector("#password").value
      loginWithFirebase(email, password)
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
    if (isSignUpButton) {
      redirect("#signup")
    }
  })

  return container
}