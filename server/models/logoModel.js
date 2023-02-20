const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const webSetting = new Schema({
    logo: {
        type: Object
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    linkedIn: {
        type: String
    },
    offersirName: {
        type: String
    },
    editor: {
        type: String
    },
    email: {
        type: String
    },
    email1: {
        type: String
    },
    Residentials1: {
        type: String
    },
    Residentials2: {
        type: String
    },
    phone: {
        type: String
    },
    Residentials3: {
        type: String
    },
    Website: {
        type: String
    },
    addressContact: {
        type: String

    }
},
    { timestamps: true }
)

const webWork = mongoose.model('webSetting', webSetting);
module.exports = webWork;