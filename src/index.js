import login from "./pages/login.js"
import signup from "./pages/signup.js"
import rooms from "./pages/rooms.js"
import patientForm from "./pages/patient-form.js"
import { isLoggedUser } from "./services/firebase.js"
function routes() {
  const root = document.querySelector("#root")
  root.innerHTML = ""

  switch (window.location.hash) {
    case "#login":
      root.appendChild(login())
      break
    case "#signup":
      root.appendChild(signup())
      break
    case "#tele":
      root.appendChild(rooms())
      break
    case "#patient-form":
      root.appendChild(patientForm())
      break
    default:
      root.appendChild(login())
  }
}

window.addEventListener("load", () => {
  const userLogged = isLoggedUser()
  if (userLogged) {
    window.location.hash = "#tele"
  } else {
    window.location.hash = "#login"
  }
  routes()
})
window.addEventListener("hashchange", routes)