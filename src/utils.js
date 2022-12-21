export function redirect(hash) {
  window.location.hash = hash
}

export function showError(text) {
  const element = document.createElement("p")
  element.classList.add("error")
  element.innerHTML = text
  return element
}
