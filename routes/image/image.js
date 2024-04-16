import express from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
import fs from 'fs';
const router = express.Router();

const a = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}-${file.originalname}`);
  },
});

const upload = multer({ storage: a });

router.post('/image', upload.single('file'), (req, res) => {
  res.status(200).json({ url: `http://localhost:3000/${req.file.filename}` });
  // console.log(`http://localhost:3000/${req.file.filename}`);
});
router.post('/delete', (req, res) => {
  const image = req.body.image;
  fs.unlink(`uploads/${image}`, () => {
    console.log('deleted');
  });
  res.status(200).json({ message: 'Image deleted' });
});

export default router;
