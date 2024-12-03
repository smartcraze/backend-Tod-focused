import express from 'express';
import dotenv from 'dotenv';
import attendanceRoutes from './routes/attendanceRoutes.js';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Welcome to the Attendance API!');
});

app.use('/api', attendanceRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
