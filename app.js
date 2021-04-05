const form = document.getElementById('new-todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('list')
const template = document.getElementById('list-item-template')
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST'
const TODOS_LOCAL_STORAGE = `${LOCAL_STORAGE_PREFIX}-todos`
const todos = loadTodos()
todos.forEach(renderTodos)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const todoContent = input.value
  if (todoContent === '') return
  todos.push(todoContent)
  saveTodos()
  renderTodos(todoContent)
  input.value = ''
})

function renderTodos(todo) {
  const templateClone = template.content.cloneNode(true)
  const textElement = templateClone.querySelector('[data-list-item-text]')
  textElement.innerText = todo
  list.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODOS_LOCAL_STORAGE, JSON.stringify(todos))
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_LOCAL_STORAGE)
  return JSON.parse(todosString) || []
}
