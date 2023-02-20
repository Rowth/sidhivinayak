const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BackupNewsSchema = new Schema({
    image: {
        type: String,
    },
    imagename: {
        type: String,
    },
    news: {
        type: String,
    },
    title: {
        type: String,
    },
    natureNews: {
        type: String,
    },
    natureId: {
        type: String,
    },
    Subtitle: {
        type: String,
    },
    engTitle: {
        type: String,
    },
    imageTitle: {
        type: String,
    },
    createrName: {
        type: String,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    categroyName: {
        type: String
    },
    cityId: {
        type: mongoose.Types.ObjectId,
        ref: 'City'
    },
    cityName: {
        type: String
    },
    subCategoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    subCategoryName: {
        type: String
    },
    subSubCateId: {
        type: mongoose.Types.ObjectId,
        ref: 'subSubCate'
    },
    subSubCateName: {
        type: String,
    },
    keyWords: {
        type: String,
    },
    newsId: {
        type: mongoose.Types.ObjectId,
    }
},
    { timestamps: true }
);

const News = mongoose.model('BackupNews', BackupNewsSchema);
module.exports = News;