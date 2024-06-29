const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/photos', { useNewUrlParser: true, useUnifiedTopology: true });

const PhotoSchema = new mongoose.Schema({
    filename: String,
    uploadDate: { type: Date, default: Date.now }
});

const Photo = mongoose.model('Photo', PhotoSchema);

const app = express();

app.get('/photos', (req, res) => {
    Photo.find().sort({ uploadDate: -1 }).exec((err, photos) => {
        if (err) return res.status(500).json({ message: 'Error retrieving photos' });
        res.status(200).json({ photos });
    });
});

app.listen(5000, () => console.log('Photo retrieval service running on port 5000'));
