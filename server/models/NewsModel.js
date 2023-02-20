const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    image: {
        type: String,
        //required:true
    },
    imagename: {
        type: String,
        //required:true
    },
    news: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        //required: true
    },
    natureNews: {
        type: String,
        //required: true
    },
    natureId: {
        type: String,
        //required: true
    },
    Subtitle: {
        type: String,
        //required: true
    },
    engTitle: {
        type: String,
        //required: true
    },
    imageTitle: {
        type: String,
        //required: true
    },
    createrName: {
        type: String,
        //required: true
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
    }

},
    { timestamps: true }
);

const News = mongoose.model('News', NewsSchema);
module.exports = News;