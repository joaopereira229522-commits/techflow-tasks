const { Router } = require('express');
const router = Router();
const tasks = require('./tasks');

router.get('/', (req, res) => {
  res.json({ message: 'TechFlow Task API' });
});

router.get('/tasks', (req, res) => {
  res.json(tasks.getTasks());
});

router.get('/tasks/:id', (req, res) => {
  const task = tasks.getTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(task);
});

router.post('/tasks', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Corpo da requisição inválido' });
  }
  if (!req.body.title) {
    return res.status(400).json({ error: 'Campo "title" é obrigatório' });
  }
  const payload = { ...req.body };
  if (payload.priority && payload.prioridade === undefined) {
    payload.prioridade = payload.priority;
    delete payload.priority;
  }
  if (payload.prioridade !== undefined) {
    const normalized = tasks.normalizePrioridade(payload.prioridade);
    if (!normalized) return res.status(400).json({ error: 'Campo "prioridade" inválido. Valores permitidos: baixa, média, alta' });
    payload.prioridade = normalized;
  }
  const newTask = tasks.addTask(payload);
  res.status(201).json(newTask);
});

router.put('/tasks/:id', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Corpo da requisição inválido' });
  }
  const payload = { ...req.body };
  if (payload.priority && payload.prioridade === undefined) {
    payload.prioridade = payload.priority;
    delete payload.priority;
  }
  if (payload.prioridade !== undefined) {
    const normalized = tasks.normalizePrioridade(payload.prioridade);
    if (!normalized) return res.status(400).json({ error: 'Campo "prioridade" inválido. Valores permitidos: baixa, média, alta' });
    payload.prioridade = normalized;
  }
  const updated = tasks.updateTask(req.params.id, payload);
  if (!updated) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(updated);
});

router.delete('/tasks/:id', (req, res) => {
  const ok = tasks.deleteTask(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.status(204).send();
});

module.exports = router;