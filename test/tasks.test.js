const request = require('supertest');
const app = require('../src/app');
const tasksModel = require('../src/tasks');

beforeEach(() => {
  if (tasksModel.clearTasks) tasksModel.clearTasks();
});

describe('Tasks API', () => {
  test('GET /tasks returns array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tasks creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Test Task', description: 'Desc' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
    expect(res.body).toHaveProperty('prioridade');
    expect(res.body.prioridade).toBe('média');
  });

  test('POST /tasks accepts prioridade value', async () => {
    const res = await request(app).post('/tasks').send({ title: 'P1', prioridade: 'alta' });
    expect(res.statusCode).toBe(201);
    expect(res.body.prioridade).toBe('alta');
  });

  test('POST /tasks rejects invalid prioridade', async () => {
    const res = await request(app).post('/tasks').send({ title: 'P2', prioridade: 'urgent' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /tasks/:id returns created task', async () => {
    const post = await request(app).post('/tasks').send({ title: 'T2' });
    const id = post.body.id;
    const res = await request(app).get(`/tasks/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);
  });

  test('PUT /tasks/:id updates task', async () => {
    const post = await request(app).post('/tasks').send({ title: 'ToUpdate' });
    const id = post.body.id;
    const res = await request(app).put(`/tasks/${id}`).send({ title: 'Updated' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated');
  });

  test('PUT /tasks/:id updates prioridade', async () => {
    const post = await request(app).post('/tasks').send({ title: 'ToUpdatePrioridade' });
    const id = post.body.id;
    const res = await request(app).put(`/tasks/${id}`).send({ prioridade: 'baixa' });
    expect(res.statusCode).toBe(200);
    expect(res.body.prioridade).toBe('baixa');
  });

  test('DELETE /tasks/:id removes task', async () => {
    const post = await request(app).post('/tasks').send({ title: 'ToDelete' });
    const id = post.body.id;
    const res = await request(app).delete(`/tasks/${id}`);
    expect(res.statusCode).toBe(204);
    const get = await request(app).get(`/tasks/${id}`);
    expect(get.statusCode).toBe(404);
  });
});
