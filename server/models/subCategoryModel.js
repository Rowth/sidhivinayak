const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name: {
        type: String,
        // require:true

    },
    category: {
        type: String,
        // require:true
    },
    categoryId: {
        type: mongoose.Types.ObjectId
    },
    count: {
        type: Number,
        default: 0
    },
    viewOrder: {
        type: Number,
    }, 
},
{ timestamps: true }
);
const subCategory = mongoose.model('subCategory', subCategorySchema);
module.exports = subCategory;