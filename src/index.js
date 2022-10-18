import login from "./pages/login.js"
import signup from "./pages/signup.js"

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
    default:
      root.appendChild(login())
  }
}

window.addEventListener("load", () => {
  window.location.hash = "#login"
  routes()
})
window.addEventListener("hashchange", routes)