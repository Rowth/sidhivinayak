const NatureNews = require('../models/NatureNewsModel');

const addNatureNews = async (req, res) => {
    try {
        const id = req.body.id
        const natureNews = req.body.natureNews;
        const options = { new: true };
        const body = { NatureOfNews: natureNews }
        const existCategory = await NatureNews.findOne({ NatureOfNews: natureNews })
        if (!existCategory) {
            if (id) {
                const categoryUpdate = await NatureNews.findByIdAndUpdate(id, body, options);
                return res.status(200).json({ status: 200, message: 'Nature Of News Update Successfully' })
            }
            else {
                const newCategory = await new NatureNews({ NatureOfNews: natureNews }).save();
                return res.status(200).json({ status: 200, message: 'Nature Of News Added Successfully' })
            }
        }
        else {
            return res.status(401).json({ status: 401, message: 'Nature Of News already exist' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' });
    }
}

const getAllNatureNews = async (req, res) => {
    try {
        const findAllNatuNews = await NatureNews.find().sort({ NatureOfNews: 1 });
        const NatureCount = await NatureNews.find().count();
        if (!findAllNatuNews) {
            return res.send(401).json({ status: 404, message: 'Nature Of News not available' })
        }
        else {
            res.send({ findAllNatuNews, NatureCount });
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' });
    }
}
const deleteNatureNews = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteNatNews = await NatureNews.findByIdAndDelete(id);
        if (!deleteNatNews) {
            res.status(401).json({ status: 401, message: 'Nature Of News not exist' })
        }
        else {
            res.status(200).json({ status: 200, message: 'Successfully Nature Of News deleted' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}
module.exports = {
    addNatureNews,
    getAllNatureNews,
    deleteNatureNews
}
