const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    stateName: {
        type: String,
        // required:true
    },
    // categoryField: {
    //     ref: 'Category',
    // },
    status: {
        type: Boolean,
    }
},
    { timestamps: true }
);

const State = mongoose.model('State', StateSchema);
module.exports = State;