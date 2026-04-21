let tasks = [];
let nextId = 1;

function getTasks() {
  return tasks;
}

function getTask(id) {
  const num = Number(id);
  return tasks.find(t => t.id === num);
}

function addTask(task = {}) {
  const newTask = {
    id: nextId++,
    title: task.title || 'Untitled Task',
    description: task.description || '',
    priority: task.priority || 'normal',
    status: task.status || 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updated) {
  const num = Number(id);
  const idx = tasks.findIndex(t => t.id === num);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updated, id: tasks[idx].id, updatedAt: new Date().toISOString() };
  return tasks[idx];
}

function deleteTask(id) {
  const num = Number(id);
  const idx = tasks.findIndex(t => t.id === num);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

function clearTasks() {
  tasks = [];
  nextId = 1;
}

module.exports = { getTasks, getTask, addTask, updateTask, deleteTask, clearTasks };