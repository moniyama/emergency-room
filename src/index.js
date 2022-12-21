import login from "./pages/login.js"
import signup from "./pages/signup.js"
import rooms from "./pages/rooms.js"
import patientForm from "./pages/patient-form.js"
import { isLoggedUser } from "./services/firebase.js"
import header from "./components/header.js"
import { redirect } from "./utils.js"

function routes() {
  const root = document.querySelector("#root")
  root.innerHTML = ""

  root.appendChild(header())
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

window.addEventListener("load", async () => {
  const userLogged = await isLoggedUser()
  if (userLogged) {
    redirect("#tele")
  } else {
    redirect("#login")
  }
  routes()
})
window.addEventListener("hashchange", routes)