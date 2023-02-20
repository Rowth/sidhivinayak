const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const advertisementSchema = new Schema({
    image: {
        type: String,
    },
    adsCategoryId: {
        type: String,
    },
    adsCategoryName: {
        type: String,
    },
    adsSubcateId: {
        type: String,
    },
    adsSubcateName: {
        type: String,
    },
    adsSubSubCateId: {
        type: String,
    },
    adsSubSubCateName: {
        type: String,
    },
    time: {
        type: String,
    },
    url: {
        type: String
    },
    title: {
        type: String
    },
    filetype: {
        type: String
    },
    viewOrder: {
        type: Number
    },
    milliSec: {
        type: Number
    }
},
    { timestamps: true }
)
const ads = mongoose.model('advertisement', advertisementSchema);
module.exports = ads;