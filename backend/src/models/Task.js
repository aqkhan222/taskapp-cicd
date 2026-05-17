import { getDb } from '../db/database.js';

export const Task = {
  async findAll() {
    const db = getDb();
    return await db.all('SELECT * FROM tasks ORDER BY created_at DESC');
  },

  async create(task) {
    const db = getDb();
    const result = await db.run(
      'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
      [task.title, task.description, task.completed || 0]
    );
    return { id: result.lastID, ...task };
  },

  async update(id, updates) {
    const db = getDb();
    const { title, description, completed } = updates;
    await db.run(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description, completed, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    const db = getDb();
    await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    return { deleted: true };
  },

  async findById(id) {
    const db = getDb();
    return await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
  }
};