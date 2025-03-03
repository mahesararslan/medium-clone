// // create express server for image upload
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { upload } from './middleware/multer.middleware.js';
// import uploadOnCloudinary from './utils/cloudinary.js';

// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// // Convert import.meta.url to a file path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const tempDir = join(__dirname, 'public', 'temp');

// // Check and create the directory if it doesn't exist
// import fs from 'fs';

// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir, { recursive: true });
// }

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.post('/api/upload', upload.single('file'), async (req, res) => {
//   try {
//     const { path: localFilePath } = req.file;
//     console.log("Local file path: ", localFilePath);
//     const result = await uploadOnCloudinary(localFilePath);
//     res.json({ url: result.url });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on PORT ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "de6vbbce4",
  api_key: process.env.CLOUDINARY_API_KEY || "141825311257666",
  api_secret: process.env.CLOUDINARY_API_SECRET || "zjbMmjl9XN-SCmXn26dYugD8qvg",
});

// Configure Multer to store file in memory (RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Test API
app.get('/', (req, res) => {
  res.send('Hello, Express Server is Running!');
});

// Image Upload API
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'uploads' }, // Cloudinary folder name
      (error, uploadResult) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ url: uploadResult.secure_url });
      }
    ).end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
