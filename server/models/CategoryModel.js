const { string, required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    categoryName: {
        type: String,
        // required:true
    },
    count: {
        type: Number,
        default: 0
    },
    viewOrder:{
        type:Number,
    }
},
    { timestamps: true }
);


const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;