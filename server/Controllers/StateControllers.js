// const Category = require('../models/CategoryModel');
const State = require('../models/StatesModel');
const City = require('../models/CityesModel');
const { default: mongoose } = require('mongoose');
// const News = require('../models/NewsModel');
// const Admin = require('../models/adminModel');

// #######states API#####
const addStates = async (req, res) => {
    try {
        const states = req.body.stateName;
        const existStates = await State.findOne({ stateName: { '$regex': states, '$options': 'i' } });
        if (!existStates) {
            const newState = await new State({ stateName: states }).save();
            return res.status(200).json({ status: 200, message: 'State Added Successfully' })
        }
        else {
            return res.status(401).json({ status: 401, message: 'State already exist' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const getAllStates = async (req, res) => {
    try {
        const getStates = await State.find().sort({ createdAt: -1 });
        const statesCount = await State.find().count();
        if (!getStates) {
            return res.status(401).json({ status: 404, message: 'State not exist' });
        }
        else {
            res.send({ getStates, statesCount })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const updateState = async (req, res) => {
    try {
        const id = req.params.id;
        const object = { new: true };
        const body = { stateName: req.body.state };
        const state = await State.findByIdAndUpdate(id, body, object);
        if (!state) {
            return res.send(401).json({ status: 401, message: 'State not exist' });
        }
        else {
            return res.status(200).json({ status: 200, message: 'Successfully state updated' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}


// #########cityes work#######
const addCityes = async (req, res) => {
    try {
        const city = req.body.nameCity;
        const state = req.body.nameState;
        const id = req.body.id;
        const existStates = await City.findOne({ cityName: { '$regex': city, '$options': 'i' } }, { stateId: id });
        if (!existStates) {
            const cityData = {
                cityName: city,
                stateName: state,
                stateId: id
            }
            const newCityName = await new City(cityData).save();
            return res.status(200).json({ status: 200, message: 'City Added Successfully' })
        }
        else {
            return res.status(401).json({ status: 401, message: 'City already exist' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const getCities = async (req, res) => {
    try {
        const id = req.query.id;
        // const state = req.query.state;
        const findCities = await City.find({ stateId: id });
        const citiesCount = await City.find({ stateId: id }).count();
        if (findCities.length == 0) {
            return res.status(401).json({ status: 401, message: 'City already exist' })
        }
        else {
            res.send({ findCities, citiesCount })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const updateCities = async (req, res) => {
    try {
        const id = req.body.id;
        const options = { new: true };
        const body = { cityName: req.body.city };
        const updateName = await City.findByIdAndUpdate(id, body, options);
        if (!updateName) {
            return res.status(401).json({ status: 401, message: 'city not exist' })
        }
        else {
            return res.status(200).json({ status: 200, message: 'Successfully city updated' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}
const deleteCities = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteCities = await City.findByIdAndDelete(id);
        if (!deleteCities) {
            return res.status(401).json({ status: 401, message: 'city not exist' })
        }
        else {
            return res.status(200).json({ status: 200, message: 'Successfully city deleted' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

module.exports = {
    addStates,
    getAllStates,
    updateState,
    addCityes,
    getCities,
    updateCities,
    deleteCities
}