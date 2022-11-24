const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    book: {
        type: String,
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Manga', mangaSchema);