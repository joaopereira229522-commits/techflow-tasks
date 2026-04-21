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
  const newTask = tasks.addTask(req.body);
  res.status(201).json(newTask);
});

router.put('/tasks/:id', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Corpo da requisição inválido' });
  }
  const updated = tasks.updateTask(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(updated);
});

router.delete('/tasks/:id', (req, res) => {
  const ok = tasks.deleteTask(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.status(204).send();
});

module.exports = router;