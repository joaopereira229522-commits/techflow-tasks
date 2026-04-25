let tasks = [];
let nextId = 1;

const VALID_PRIORIDADES_MAP = {
  'baixa': 'baixa',
  'baixo': 'baixa',
  'low': 'baixa',
  'media': 'média',
  'média': 'média',
  'medio': 'média',
  'médio': 'média',
  'normal': 'média',
  'medium': 'média',
  'alta': 'alta',
  'high': 'alta'
};

function normalizePrioridade(val) {
  if (val === undefined || val === null) return undefined;
  const s = String(val).toLowerCase();
  return VALID_PRIORIDADES_MAP[s] || undefined;
}

function getTasks() {
  return tasks;
}

function getTask(id) {
  const num = Number(id);
  return tasks.find(t => t.id === num);
}

function addTask(task = {}) {
  const prioridade = normalizePrioridade(task.prioridade ?? task.priority) || 'média';
  const newTask = {
    id: nextId++,
    title: task.title || 'Untitled Task',
    description: task.description || '',
    prioridade: prioridade,
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

  const cleaned = { ...updated };
  if (cleaned.priority !== undefined && cleaned.prioridade === undefined) {
    const p = normalizePrioridade(cleaned.priority);
    if (p) cleaned.prioridade = p;
    delete cleaned.priority;
  }
  if (cleaned.prioridade !== undefined) {
    const p = normalizePrioridade(cleaned.prioridade);
    if (p) cleaned.prioridade = p;
    else delete cleaned.prioridade;
  }

  tasks[idx] = { ...tasks[idx], ...cleaned, id: tasks[idx].id, updatedAt: new Date().toISOString() };
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

module.exports = { getTasks, getTask, addTask, updateTask, deleteTask, clearTasks, normalizePrioridade };