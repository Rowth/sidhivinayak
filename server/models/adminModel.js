const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    plainPass: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    permission:{
        type: String
    },
    token: {
        type: String
    },
},
    { timestamps: true }

)
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;