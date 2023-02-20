const subCategory = require('../models/subCategoryModel');
const News = require('../models/NewsModel');
const subSubCat = require('../models/subSubCategory');
const ads = require('../models/advertisement');

// ######subcategory API$########
const addSubCategory = async (req, res) => {
    try {
        const categoryData = {
            name: req.body.subcategory,
            category: req.body.category,
            categoryId: req.body.CategoryId,
            viewOrder: req.body.viewOrder,
        }
        const id = req.body.id;
        const options = { new: true };
        // const existStates = await subCategory.findOne({ name: categoryData?.name, category: categoryData?.category });
        const existStates = await subCategory.findOne({ name: { $regex: categoryData.name, $options: 'i' } });
        if (id) {
            const upSubCat = await News.updateMany({ subCategoryId: id }, { $set: { subCategoryName: categoryData?.name } })
            const upSubSubCat = await subSubCat.updateMany({ subcategoryId: id }, { $set: { subcategory: categoryData?.name } })
            const upadsCatName = await ads.updateMany({ adsSubcateId: id }, { $set: { adsSubcateName: categoryData?.name } });
            const upDate = await subCategory.findByIdAndUpdate(id, categoryData, options);
            return res.status(200).json({ status: 200, message: 'SubCategory Update Successfully' })
        }
        else {
            if (!existStates) {
                const newCityName = await new subCategory(categoryData).save();
                return res.status(200).json({ status: 200, message: 'SubCategory Added Successfully' })
            }
            else {
                return res.status(401).json({ status: 401, message: 'SubCategory already exist' })
            }
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const allGetSubCategory = async (req, res) => {
    try {
        const findSubCategory = await subCategory.find().sort({ viewOrder: 1 });
        const subCategoryCount = await subCategory.find().count();
        if (findSubCategory.length == 0) {
            return res.status(201).json({ status: 401, message: 'SubCategory not exist' })
        }
        else {
            res.status(201).json({ findSubCategory, subCategoryCount })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}
const getSubCategory = async (req, res) => {
    try {

        const id = req.query.id;
        const findSubCategory = await subCategory.find({ categoryId: id }).sort({ viewOrder: 1, updatedAt: -1 });
        const subCategoryCount = await subCategory.find({ categoryId: id, updatedAt: -1 }).count();

        if (findSubCategory.length == 0) {
            return res.status(201).json({ status: 401, message: 'SubCategory not exist' })

        }
        else {
            res.status(201).json({ findSubCategory, subCategoryCount })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const id = req.body.id;
        const body = { name: req.body.subcategory };
        const category = { category: req.body.category };
        const CategoryId = { categoryId: req.body.CategoryId }
        const options = { new: true };
        const upDate = await subCategory.findByIdAndUpdate(id, body, category, CategoryId, options);
        if (!upDate) {
            return res.status(401).json({ status: 401, message: 'subcategory not exist' })
        }
        else {
            return res.status(200).json({ status: 200, message: 'Successfully city updated' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteCate = await subCategory.findByIdAndDelete(id);
        if (!deleteCate) {
            return res.status(401).json({ status: 401, message: 'subCategory not exist' })
        }
        else {
            return res.status(200).json({ status: 200, message: 'Successfully subCategory deleted' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

module.exports = {
    addSubCategory,
    getSubCategory,
    allGetSubCategory,
    updateSubCategory,
    deleteSubCategory
}