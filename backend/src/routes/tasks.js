import express from 'express';
import { Task } from '../models/Task.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const newTask = await Task.create({ title, description, completed: false });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a task
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    const updated = await Task.update(id, { title, description, completed });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Task.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;