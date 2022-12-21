import login from "./pages/login.js"
import signup from "./pages/signup.js"
import rooms from "./pages/rooms.js"
import patientForm from "./pages/patient-form.js"
import { isLoggedUser } from "./services/firebase.js"
import header from "./components/header.js"
function routes() {
  const root = document.querySelector("#root")
  root.innerHTML = ""

  switch (window.location.hash) {
    case "#login":
      root.appendChild(header())
      root.appendChild(login())
      break
    case "#signup":
      root.appendChild(header())
      root.appendChild(signup())
      break
    case "#tele":
      root.appendChild(header())
      root.appendChild(rooms())
      break
    case "#patient-form":
      root.appendChild(header())
      root.appendChild(patientForm())
      break
    default:
      root.appendChild(login())
  }
}

window.addEventListener("load", async() => {
  const userLogged = await isLoggedUser()
  if (userLogged) {
    window.location.hash = "#tele"
  } else {
    window.location.hash = "#login"
  }
  routes()
})
window.addEventListener("hashchange", routes)