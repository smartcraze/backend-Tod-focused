import express from 'express';
import {createAttendance,getAllAttendance,deleteAllAttendance} from '../controllers/attendanceController.js';

const router = express.Router();

// POST - Create new attendance record
router.post('/attendance', createAttendance);

// GET - Get all attendance records
router.get('/attendance', getAllAttendance);
router.delete('/attendance/clear', deleteAllAttendance);
export default router;
