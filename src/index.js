import login from "./pages/login.js"

function routes() {
  const root = document.querySelector("#root")
  switch (window.location.hash) {
    case "#login":
      root.appendChild(login())
      break
    default:
      root.appendChild(login())
  }
}

window.addEventListener("load", routes)
window.addEventListener("hashchange", routes)