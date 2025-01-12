 
/* I knew all the required read-only variables. */

const mainInput = document.getElementById('mainInput');
const inputButton = document.getElementById('inputButton');
const inputNote = document.getElementById('inputNote');
const scrollContainer = document.getElementById('scrollContainer');
const noTasksHeader = document.getElementById('noTasksHeader');
const deleteDone = document.getElementById('deleteDone');
const deleteAll = document.getElementById('deleteAll');
const allTab = document.getElementById('all');
const doneTab = document.getElementById('done');
const todoTab = document.getElementById('todo');

// This is a matrix for saving tasks.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks to the DOM
const renderTasks = (filter = 'all') => {
  scrollContainer.innerHTML = '';
  const filteredTasks =
    filter === 'done'
      ? tasks.filter((task) => task.completed)
      : filter === 'todo'
      ? tasks.filter((task) => !task.completed)
      : tasks;

  filteredTasks.forEach((task) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('id', task.id);

    const taskText = document.createElement('p');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('taskParagraphCrossed');
    }

    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add('icons');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

    // Edit button
    const editIcon = document.createElement('img');
    editIcon.src = './sourceImages/icons/pencil-solid.svg';
    editIcon.alt = 'Edit Task';
    editIcon.addEventListener('click', () => editTask(task.id));

    // Delete button
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './sourceImages/icons/trash-solid.svg';
    deleteIcon.alt = 'Delete Task';
    deleteIcon.addEventListener('click', () => deleteTask(task.id));

    iconsDiv.append(checkbox, editIcon, deleteIcon);
    taskDiv.append(taskText, iconsDiv);
    scrollContainer.append(taskDiv);
  });

  noTasksHeader.style.display = tasks.length === 0 ? 'block' : 'none';
};

// Add new task buttoun
const addTask = () => {
  const taskText = mainInput.value.trim();

  if (!validateInput(taskText)) {
    inputNote.style.display = 'block';
    return;
  }
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  tasks.push(newTask);
  mainInput.value = '';
  inputNote.style.display = 'none';
  saveTasks();
  renderTasks();
};

// Validate input != 6 char no add
const validateInput = (input) => {
  return input.length > 5 && isNaN(input[0]);
};

// Toggle task completion
const toggleTaskCompletion = (taskId) => {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
};

// Edit task
const editTask = (taskId) => {
  const newTaskText = prompt('Enter new task text:').trim();
  if (!validateInput(newTaskText)) {
    alert('Invalid input. Task must be longer than 5 characters and not start with a number.');
    return;
  }
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, text: newTaskText } : task
  );
  saveTasks();
  renderTasks();
};

// button delete task
const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
};

// button delete done tasks
const deleteDoneTasks = () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
};

// button delete all tasks
const deleteAllTasks = () => {
  tasks = [];
  saveTasks();
  renderTasks();
};

// Save tasks to (localStorage)
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Event listeners definition and programming
inputButton.addEventListener('click', addTask);
deleteDone.addEventListener('click', deleteDoneTasks);
deleteAll.addEventListener('click', deleteAllTasks);
allTab.addEventListener('click', () => renderTasks('all'));
doneTab.addEventListener('click', () => renderTasks('done'));
todoTab.addEventListener('click', () => renderTasks('todo'));

renderTasks();
