const joi = require('joi');

const AdminValidate = joi.object({
    name: joi.string(),
    email: joi.string().lowercase().email().required(),
    password: joi.string().lowercase().min(5).required(),
    role: joi.string(),
    plainPass: joi.string(),
    permission:joi.string(),

})

module.exports = { AdminValidate }
