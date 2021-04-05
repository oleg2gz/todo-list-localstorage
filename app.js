const form = document.getElementById('new-todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('list')
const template = document.getElementById('list-item-template')
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST'
const TODOS_LOCAL_STORAGE = `${LOCAL_STORAGE_PREFIX}-todos`
const todos = loadTodos()
todos.forEach(renderTodos)

list.addEventListener('change', (e) => {
  if (!e.target.matches('[data-list-item-checkbox]')) return
  const parent = e.target.closest('.list-item')
  const id = parent.dataset.todoId
  const todo = todos.find((t) => t.id === id)
  todo.complete = e.target.checked
  saveTodos()
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const todoContent = input.value
  if (todoContent === '') return
  const todo = {
    text: todoContent,
    complete: false,
    id: new Date().valueOf().toString(),
  }
  todos.push(todo)
  saveTodos()
  renderTodos(todo)
  input.value = ''
})

function renderTodos(todo) {
  const templateClone = template.content.cloneNode(true)
  const textElement = templateClone.querySelector('[data-list-item-text]')
  textElement.innerText = todo.text
  const checkbox = templateClone.querySelector('[data-list-item-checkbox]')
  checkbox.checked = todo.complete
  const listItem = templateClone.querySelector('.list-item')
  listItem.dataset.todoId = todo.id
  list.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODOS_LOCAL_STORAGE, JSON.stringify(todos))
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_LOCAL_STORAGE)
  return JSON.parse(todosString) || []
}
