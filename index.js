import express from 'express';
import dotenv from 'dotenv';
import AllRoutes from './routes/attendanceRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API routes
app.use('/api', AllRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

export default app;
