const express = require('express');
const sharp = require('sharp');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { path: filePath, originalname } = req.file;
  const outputFilePath = path.join('uploads', `${path.parse(originalname).name}.webp`);

  try {
    await sharp(filePath).webp().toFile(outputFilePath);
    fs.unlinkSync(filePath);
    res.download(outputFilePath, () => fs.unlinkSync(outputFilePath));
  } catch (error) {
    res.status(500).send('Error converting image.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
