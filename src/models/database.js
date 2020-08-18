const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataBase = new Schema({
    name: String, 
    description: String, 
    coverPage: String, 
    typeResource: String,
    status: {
        type: Boolean,
        default: false
    }
});