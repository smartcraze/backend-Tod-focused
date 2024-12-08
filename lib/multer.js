import fs from "fs";
import multer from "multer";
import path from "path";

const uploadsDir = path.join(process.cwd(), "/tmp");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

export const upload = multer({ storage: storage });
