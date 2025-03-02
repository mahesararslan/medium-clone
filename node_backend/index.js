// create express server for image upload
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { upload } from './middleware/multer.middleware.js';
import uploadOnCloudinary from './utils/cloudinary.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = join(__dirname, 'public', 'temp');

// Check and create the directory if it doesn't exist
import fs from 'fs';

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { path: localFilePath } = req.file;
    console.log("Local file path: ", localFilePath);
    const result = await uploadOnCloudinary(localFilePath);
    res.json({ url: result.url });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
