import express from 'express';
import {createAttendance,getAllAttendance,deleteAllAttendance} from '../controllers/attendanceController.js';
import {UploadFlexcode,deleteAllFlexcode,getAllFlexcode} from'../controllers/flexcodecontroller.js';
import { upload } from '../lib/multer.js';

const router = express.Router();

// all the routes 
router.post('/attendance', createAttendance);
router.post('/flexcode',upload.single('image'),UploadFlexcode);

router.get('/attendance', getAllAttendance);
router.get('/flexcode', getAllFlexcode);




router.delete('/attendance/clear', deleteAllAttendance);
router.delete('/flexcode/clear', deleteAllFlexcode);

export default router;
