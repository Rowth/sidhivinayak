const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NatureSchema = new Schema({
    NatureOfNews: {
        type: String,
    },
},
    { timestamps: true }
);


const NatureData = mongoose.model('NatureSchema', NatureSchema);
module.exports = NatureData;