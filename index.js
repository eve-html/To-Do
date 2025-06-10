const input = document.getElementById('taskInput');
const button = document.getElementById('createBtn');
const taskList = document.getElementById('taskList');

let tasks = loadTasks();
renderTasks();

button.addEventListener('click', () => {
  const text = input.value.trim();
  if (text === '') return;

  const newTask = {
    id: Date.now(),
    text: text,
    done: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  input.value = '';
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    if (task.done) {
      taskDiv.classList.add('done');
    }

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.className = 'task-text';
    if (task.done) {
      taskText.classList.add('done');
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.done ? 'Не сделано' : 'Сделано';
    toggleBtn.className = 'toggle-btn';

    toggleBtn.addEventListener('click', () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskDiv.appendChild(taskText);
    taskDiv.appendChild(toggleBtn);
    taskDiv.appendChild(deleteBtn);

    taskList.appendChild(taskDiv);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
}
