const express = require('express');
const sharp = require('sharp');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tmp = require('tmp');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create a temporary directory
const tempDir = tmp.dirSync({ unsafeCleanup: true }).name;

// Configure Multer to use the temporary directory
const upload = multer({ dest: tempDir });

// Basic route to handle GET requests to root
app.get('/', (req, res) => {
  res.send('Welcome to the Image Conversion API!');
});

app.post('/convert', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { path: filePath, originalname } = req.file;
  const outputFilePath = path.join(tempDir, `${path.parse(originalname).name}.webp`);

  try {
    await sharp(filePath).webp().toFile(outputFilePath);
    res.download(outputFilePath, (err) => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputFilePath);

      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file.');
      }
    });
  } catch (error) {
    fs.unlinkSync(filePath);
    res.status(500).send('Error converting image.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
