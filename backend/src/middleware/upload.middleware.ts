// src/middleware/upload.middleware.ts

import multer from "multer";
import path from "path";
import fs from "fs";

// uploads mappa létrehozása, ha nem létezik
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');  // az uploads mappa
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, '-');
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    cb(null, `${baseName}-${timestamp}${ext}`);
  }
});


export const upload = multer({ storage });
