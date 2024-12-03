import Attendance from '../models/attendance.js';
import { connectDb } from '../lib/db.js';

export const createAttendance = async (req, res) => {
  try {
    await connectDb();
    const data = req.body;

    const currentDate = new Date();
    const inputDate = new Date(data.date);

    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate > currentDate) {
      return res.status(400).json({ error: 'Cannot mark attendance for a future date' });
    }

    if (inputDate < currentDate) {
      return res.status(400).json({ error: 'Cannot mark attendance for a past date' });
    }

    const existingAttendance = await Attendance.findOne({
      date: currentDate,
    });

    if (existingAttendance) {
      // If attendance already exists, append new notes to existing notes
      existingAttendance.notes.push(...data.notes);
      await existingAttendance.save();
      return res.status(200).json(existingAttendance); // Return updated attendance
    }

    const attendance = new Attendance({
      ...data,
      date: currentDate,
    });

    await attendance.save();
    console.log(attendance);
    return res.status(201).json(attendance);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to mark attendance' });
  }
};


export const getAllAttendance = async (req, res) => {
  try {
    await connectDb();
    const attendance = await Attendance.find().sort({ date: -1 });
    return res.status(200).json(attendance);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch attendance' });
  }
};


export const deleteAllAttendance = async (req, res) => {
  try {
    await connectDb();
    
    // Delete all documents in the Attendance collection
    const result = await Attendance.deleteMany({});

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No attendance records found to delete' });
    }

    return res.status(200).json({ message: 'All attendance records have been deleted' });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to delete attendance records' });
  }
};