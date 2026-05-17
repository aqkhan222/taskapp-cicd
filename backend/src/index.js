import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db/database.js';
import tasksRouter from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// API routes
app.use('/api/tasks', tasksRouter);

// Start server after DB init
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`📦 Health check: http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('❌ Database initialization failed:', err);
})