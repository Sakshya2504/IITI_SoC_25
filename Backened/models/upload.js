// backend/uploadRoute.js
import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Handle PDF or Image upload
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

export default router;
