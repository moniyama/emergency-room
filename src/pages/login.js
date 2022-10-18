export default function () {
  const container = document.createElement("section")
  container.innerHTML = `
    <input type="email" placeholder="email">
    <input type="password" placeholder="password">
    <button id="btn-login">LOGIN</button>
    <button id="btn-sign-up">Cadastrar</button>
  `

  return container
}