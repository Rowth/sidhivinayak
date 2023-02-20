const mongoose = require('mongoose');
const { schema } = require('./subCategoryModel');
const Schema = mongoose.Schema;

const subSubCateSchems = new Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    categoryId: {
        type: mongoose.Types.ObjectId
    },
    subcategory: {
        type: String,
    },
    subcategoryId: {
        type: mongoose.Types.ObjectId
    },
    count: {
        type: Number,
        default: 0
    },
    viewOrder: {
        type: Number,
    }
},
    { timestamps: true }
);
const subSubCate = mongoose.model('subSubCate', subSubCateSchems);
module.exports = subSubCate;
