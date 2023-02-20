const jwt = require('jsonwebtoken');
const userCollection = require('../models/adminModel')

const createToken = async (data, time) => {
    try {
        let userData = {
            _id: data.id,
            email: data.email
        }
        const token = await jwt.sign(userData, "138f530787df5fe97457bb228d6f6c85742ac4a8ce2a03d59e8c460fe01d8e7248505", { expiresIn: time });
        return token
    }
    catch (error) {
        return error
    }
}
const verifyTokens = async (req, res, next) => {
    try {
        const userVerify = req.headers.authentication;
        const user = await userCollection.findOne({ token: userVerify });
        console.log(userVerify, "====")
        if (!user || !user?.token) {
            return res.status(401).send({ "message": 'unauthorized' })
        }
        next();
    }
    catch (error) {
        return res.status(401).send({ "message": 'somthing wrong' })
    }
}

module.exports = {
    createToken,
    verifyTokens
}