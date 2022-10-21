export default function () {
  const container = document.createElement("div")

  container.innerHTML = `
    <form>
      <label for="name">Nome completo</label>
      <input id="name" type="text">
      <label for="age">Idade</label>
      <input id="age" type="number">
      <label for="gender">Genero</label>
      <select id="gender">
        <option>Masculino</option>
        <option>Feminino</option>
        <option>Não declarado</option>
      </select>
      <label for="severity">Gravidade da lesão</label>
      <select id="severity">
        <option>ESI 1 Grave</option>
        <option>ESI 2 Gravidade mediana</option>
        <option>ESI 3 Menos grave</option>
        <option>ESI 4 Leve</option>
        <option>ESI 5 Atenção geral</option>
      </select>
      <button id="add-patient">Adicionar</button>
    </form>
  `
  container.querySelector("#add-patient").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("salvar")
  })
  return container
}