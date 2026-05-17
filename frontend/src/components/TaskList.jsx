import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createTask({ title: newTitle, description: newDesc });
    setNewTitle('');
    setNewDesc('');
    loadTasks();
  };

  const toggleComplete = async (task) => {
    await updateTask(task.id, { ...task, completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>📋 Task Manager</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
            <input
              type="checkbox"
              checked={task.completed === 1}
              onChange={() => toggleComplete(task)}
            />
            <strong style={{ marginLeft: '10px', textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </strong>
            {task.description && <p style={{ margin: '5px 0 0 25px', color: '#666' }}>{task.description}</p>}
            <button onClick={() => handleDelete(task.id)} style={{ float: 'right' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}