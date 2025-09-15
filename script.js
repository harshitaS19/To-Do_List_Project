// Load tasks when page loads
window.onload = loadTasks;

let currentFilter = "all";

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDateInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false,
    dueDate: dueDateInput.value || null
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  dueDateInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "incomplete") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const dueDate = document.createElement("small");
    if (task.dueDate) {
      dueDate.textContent = `Due: ${task.dueDate}`;
      dueDate.style.display = "block";
    }

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.onclick = () => toggleComplete(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(dueDate);
    li.appendChild(completeBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function loadTasks() {
  renderTasks();
}

function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const actualIndex = getActualIndex(index);
  tasks[actualIndex].completed = !tasks[actualIndex].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const actualIndex = getActualIndex(index);
  tasks.splice(actualIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Get index in original list
function getActualIndex(filteredIndex) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "incomplete") return !task.completed;
    return true;
  });
  const taskToFind = filteredTasks[filteredIndex];
  return tasks.findIndex(t => t.text === taskToFind.text && t.dueDate === taskToFind.dueDate);
}
// Activate icons
lucide.createIcons();

// Dark mode toggle
document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  lucide.createIcons(); // re-render icons
});
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  }
  requestAnimationFrame(animateStars);
}
animateStars();



