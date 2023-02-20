const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');
const { AdminValidate } = require('../Validation/AdminValidate');
const { createToken } = require('../Jwt/jwt');
const { emailWork } = require('../NodeMailer/nodeMailer');
// const { findById, findByIdAndUpdate } = require('../models/adminModel');

const Register = async (req, res) => {
    try {
        const admin = await AdminValidate.validateAsync(req.body);
        const existEmail = await Admin.findOne({ email: admin.email });
        if (existEmail) {
            return res.status(401).json({ status: 401, message: 'email already exist' })
        }
        else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newAdmin = await new Admin({ name: req.body.name, email: req.body.email, password: hashPassword, plainPass: req.body.password, permission: req.body.permission, role: 'admin' }).save();
            const token = await createToken(newAdmin, "1hours")
            const updateToken = await Admin.findByIdAndUpdate(newAdmin.id, { token: token });
            return res.status(200).json({ status: 200, message: 'Successfully Registered', newAdmin });
        }
    }
    catch (error) {
        res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const userUpdate = async (req, res) => {
    try {
        const id = req.body.id;
        const options = { new: true };
        const findUser = await Admin.findById(id);
        if (!findUser) {
            return res.status(401).json({ status: 401, message: 'User Not Exist' })
        }
        else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const updateUser = await Admin.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, password: hashPassword, plainPass: req.body.password, permission: req.body.permission, role: req.body.role }, options);
            return res.status(200).json({ status: 200, message: 'Successfully Updated' });
        }
    }
    catch (error) {
        res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const LogIn = async (req, res) => {
    try {
        const admin = await AdminValidate.validateAsync(req.body);
        const User = await Admin.findOne({ email: admin.email });
        const pwsdMatch = await Admin.findOne({ plainPass: admin.password });
        if (!User && !pwsdMatch) {
            return res.status(401).json({ status: 401, message: "email and password incorrect" });
        }
        else if (!User) {
            return res.status(401).json({ status: 401, message: "email incorrect" });
        }
        else if (!pwsdMatch) {
            return res.status(401).json({ status: 401, message: "password incorrect" });
        }
        else {
            const User = await Admin.findOne({ email: admin.email });
            return res.status(200).json({ status: 200, message: "Successfully login", userId: User._id, userRole: User.role, userToken: User.token });
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: "invalid data" });
    }
}

const forgetPassword = async (req, res) => {
    try {
        const user = await Admin.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ status: 401, message: "invalid email" });
        }
        else {
            const link = `https://sidhivinayaktimes.com/${user.id}/reset`;
            await emailWork(link, req.body.email);
            return res.status(200).json({ status: 200, message: "Reset link send in your gmail " });
        }
    }
    catch (error) {
        console.log(error)
        return res.status(503).json({ status: 503, message: "invalid data" });
    }
}

const paticularUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const userFind = await Admin.findOne({ _id: userId });
        if (!userFind) {
            return res.status(401).json({ status: 401, message: "admin not exists" });
        }
        return res.status(200).json({ status: 200, userFind });
    }
    catch {
        return res.status(503).json({ status: 503, message: "invalid" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await Admin.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ status: 401, message: "admin not existssss" });
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashPassword;
        user.plainPass = req.body.password;
        const updatePassword = await Admin.findByIdAndUpdate(userId, user);
        return res.status(200).json({ status: 200, message: "Password Reset Successfully", updatePassword });
    }
    catch {
        return res.status(503).json({ status: 503, message: "invalid" });
    }
}

const changePassword = async (req, res) => {
    try {
        const id = req.body.id;
        const oldPswd = req.body.oldPassword;
        const newPswd = req.body.newPassword;
        const admin = await Admin.findById(id);
        const pswd = await bcrypt.compare(oldPswd, admin.password);
        if (!pswd) {
            return res.status(401).json({ message: 'Old password is Wrong !' });
        }
        else {
            const bcryptPswd = await bcrypt.hash(newPswd, 10);
            const updatePswd = await Admin.findByIdAndUpdate(id, { password: bcryptPswd, plainPass: newPswd });
            return res.status(200).send({ message: 'Password Updated ' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: error.message });
    }
}

const getAdminData = async (req, res) => {
    try {
        const findAdmin = await Admin.find().sort({ createdAt: -1 });
        const userCount = await Admin.find().count();
        if (findAdmin.length == 0) {
            return res.status(503).json({ status: 404, message: 'Admin not exist' });
        }
        else {
            return res.status(200).json({ status: 200, findAdmin, userCount });
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' });
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteCategory = await Admin.findByIdAndDelete(id);
        if (!deleteCategory) {
            res.status(401).json({ status: 401, message: 'User not exist' })
        }
        else {
            res.status(200).json({ status: 200, message: 'Successfully User deleted' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

module.exports = {
    Register,
    LogIn,
    forgetPassword,
    resetPassword,
    changePassword,
    getAdminData,
    deleteUser,
    userUpdate,
    paticularUser,
}