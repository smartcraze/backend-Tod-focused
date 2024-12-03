import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, 
  },
  status: {
    type: String,
    enum: ['present', 'absent'], 
    required: true,
  },
  studyHours: {
    type: Number,
    required: true,
  },
  notes: {
    type: [String],
    required: false, 
  },
  topics: {
    type: [String], // Fixed to be an array of strings
    default: [], // Default to an empty array if no topics are provided
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
export default Attendance;
