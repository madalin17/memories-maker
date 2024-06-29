const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/photos', { useNewUrlParser: true, useUnifiedTopology: true });

const PhotoSchema = new mongoose.Schema({
    filename: String,
    uploadDate: { type: Date, default: Date.now }
});

const Photo = mongoose.model('Photo', PhotoSchema);

const app = express();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('photo'), (req, res) => {
    const newPhoto = new Photo({ filename: req.file.filename });
    newPhoto.save()
        .then(() => res.status(200).json({ message: 'Upload successful' }))
        .catch(err => res.status(500).json({ message: 'Upload failed', error: err }));
});

app.listen(4000, () => console.log('Upload service running on port 4000'));
