import login from "./pages/login.js"

function routes() {
  const root = document.querySelector("#root")
  root.innerHTML = ""

  switch (window.location.hash) {
    case "#login":
      root.appendChild(login())
      break
    default:
      root.appendChild(login())
  }
}

document.addEventListener("load", () => {
  window.location.hash = "#login"
  routes()
})
document.addEventListener("hashchange", routes)