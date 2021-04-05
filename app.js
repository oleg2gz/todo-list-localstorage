const form = document.getElementById('new-todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('list')
const template = document.getElementById('list-item-template')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const todoContent = input.value
  if (todoContent === '') return
  renderTodos(todoContent)
  input.value = ''
})

function renderTodos(todo) {
  const templateClone = template.content.cloneNode(true)
  const textElement = templateClone.querySelector('[data-list-item-text]')
  textElement.innerText = todo
  list.appendChild(templateClone)
}
