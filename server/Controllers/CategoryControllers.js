const Category = require('../models/CategoryModel');
const News = require('../models/NewsModel');
const subCategory = require('../models/subCategoryModel');
const subSubCat = require('../models/subSubCategory');
const ads = require('../models/advertisement');


// ######Category API#####
const addCategory = async (req, res) => {
    try {
        const id = req.body.id
        const category = req.body.category;
        const newOrder = req.body.newOrder;
        const options = { new: true };
        const body = { categoryName: category, viewOrder: newOrder }
        const existCategory = await Category.findOne({ categoryName: category });
        if (id) {
            const upCatName = await News.updateMany({ categoryId: id }, { $set: { categroyName: category } });
            const upSubCatName = await subCategory.updateMany({ categoryId: id }, { $set: { category: category } });
            const upSubSubCatName = await subSubCat.updateMany({ categoryId: id }, { $set: { category: category } });
            const upadsCatName = await ads.updateMany({ adsCategoryId: id }, { $set: { adsCategoryName: category } });
            const findorder = await Category.findOne({ viewOrder: newOrder });
            const updateOldOrder = await Category.findByIdAndUpdate(findorder._id, { viewOrder: req.body.oldOrder }, options);
            const categoryUpdate = await Category.findByIdAndUpdate(id, body, options);
            return res.status(200).json({ status: 200, message: 'Category Update Successfully' })
        }
        else {
            if (!existCategory) {
                const findData = await Category.findOne().sort({ viewOrder: -1 });
                if (findData) {
                    const newCategory = await new Category({ categoryName: category, viewOrder: findData.viewOrder + 1 }).save();
                }
                else {
                    const newCategory = await new Category({ categoryName: category, viewOrder: 1 }).save();
                }
                return res.status(200).json({ status: 200, message: 'Category Added Successfully' })
            }
            else {
                return res.status(401).json({ status: 401, message: 'Category already exist' })
            }
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' });
    }
}

const getAllCategory = async (req, res) => {
    try {
        const findAllCategory = await Category.find().sort({ viewOrder: 1 });
        const CategoryCount = await Category.find().count();
        if (!findAllCategory) {
            return res.send(401).json({ status: 404, message: 'Categories not available' })
        }
        else {
            res.send({ findAllCategory, CategoryCount });
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' });
    }
}
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(id);
        if (!deleteCategory) {
            res.status(401).json({ status: 401, message: 'Category not exist' })
        }
        else {
            res.status(200).json({ status: 200, message: 'Successfully Category deleted' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

module.exports = {
    addCategory,
    getAllCategory,
    deleteCategory,
}