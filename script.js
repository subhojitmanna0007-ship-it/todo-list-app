
// ----- Elements -----
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const countEl = document.getElementById('task-count');
const clearBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');

// ----- State -----
const STORAGE_KEY = 'todo-tasks';
let tasks = loadTasks();
let currentFilter = 'all';

// ----- Storage -----
function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    // Storage unavailable; the app still works for this session.
  }
}

// ----- Actions -----
function addTask(text) {
  tasks.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text: text,
    done: false
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function editTask(id, newText) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const trimmed = newText.trim();
  if (trimmed) {
    task.text = trimmed;
    saveTasks();
  }
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  render();
}

// ----- Rendering -----
function getVisibleTasks() {
  if (currentFilter === 'active') return tasks.filter(t => !t.done);
  if (currentFilter === 'completed') return tasks.filter(t => t.done);
  return tasks;
}

function startEditing(li, task) {
  const textEl = li.querySelector('.text');
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = task.text;

  li.replaceChild(editInput, textEl);
  editInput.focus();
  editInput.select();

  let finished = false;
  const finish = (save) => {
    if (finished) return;
    finished = true;
    if (save) editTask(task.id, editInput.value);
    else render();
  };

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish(true);
    if (e.key === 'Escape') finish(false);
  });
  editInput.addEventListener('blur', () => finish(true));
}

function createTaskElement(task) {
  const li = document.createElement('li');
  if (task.done) li.classList.add('done');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const text = document.createElement('span');
  text.className = 'text';
  text.textContent = task.text;
  text.title = 'Double-click to edit';
  text.addEventListener('dblclick', () => startEditing(li, task));

  const editBtn = document.createElement('button');
  editBtn.className = 'icon-btn';
  editBtn.textContent = '\u270E';
  editBtn.title = 'Edit';
  editBtn.addEventListener('click', () => startEditing(li, task));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'icon-btn delete';
  deleteBtn.textContent = '\u00D7';
  deleteBtn.title = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  li.append(checkbox, text, editBtn, deleteBtn);
  return li;
}

function render() {
  list.innerHTML = '';
  const visible = getVisibleTasks();

  visible.forEach(task => list.appendChild(createTaskElement(task)));
  emptyMessage.classList.toggle('hidden', visible.length > 0);

  const remaining = tasks.filter(t => !t.done).length;
  countEl.textContent = remaining + (remaining === 1 ? ' task left' : ' tasks left');
  clearBtn.disabled = !tasks.some(t => t.done);
}

// ----- Events -----
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addTask(value);
  input.value = '';
  input.focus();
});

clearBtn.addEventListener('click', clearCompleted);

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// ----- Init -----
render();
