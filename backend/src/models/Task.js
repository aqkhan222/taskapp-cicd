import sql from 'mssql';
import { getDb } from '../db/database.js';

export const Task = {
    async findAll() {
        const result = await getDb().request().query('SELECT * FROM tasks ORDER BY created_at DESC');
        return result.recordset;
    },

    async create(task) {
        const { title, description, completed } = task;
        const result = await getDb().request()
            .input('title', sql.NVarChar, title)
            .input('description', sql.NVarChar, description || '')
            .input('completed', sql.Bit, completed || 0)
            .query(`INSERT INTO tasks (title, description, completed) 
                    OUTPUT INSERTED.* 
                    VALUES (@title, @description, @completion)`);
        return result.recordset[0];
    },

    async update(id, updates) {
        const { title, description, completed } = updates;
        await getDb().request()
            .input('id', sql.Int, id)
            .input('title', sql.NVarChar, title)
            .input('description', sql.NVarChar, description)
            .input('completed', sql.Bit, completed)
            .query(`UPDATE tasks SET title=@title, description=@description, completed=@completed WHERE id=@id`);
        return this.findById(id);
    },

    async delete(id) {
        await getDb().request()
            .input('id', sql.Int, id)
            .query('DELETE FROM tasks WHERE id=@id');
        return { deleted: true };
    },

    async findById(id) {
        const result = await getDb().request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM tasks WHERE id=@id');
        return result.recordset[0];
    }
};