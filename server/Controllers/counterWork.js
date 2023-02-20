const News = require('../models/NewsModel');
const Admin = require('../models/adminModel');
const Category = require('../models/CategoryModel');
const subCategory = require('../models/subCategoryModel');
const subSubCat = require('../models/subSubCategory');
const ads = require('../models/advertisement');


const counterApi = async (req, res) => {
    try {
        const newsNo = await News.count({ categoryName: { $exists: true } });
        const userNo = await Admin.count({ email: { $exists: true } });
        const categoryNo = await Category.count({ categoryName: { $exists: true } });
        const subCategoryNo = await subCategory.count({ category: { $exists: true }, categoryId: { $exists: true } });
        const subSubCatNo = await subSubCat.count({ subcategory: { $exists: true }, subcategoryId: { $exists: true } });
        const adsNo = await ads.count({ image: { $exists: true } });
res.status(200).json({status:200,message:"count ge successfuly",newsNo,userNo,categoryNo,subCategoryNo,subSubCatNo,adsNo});
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' });
    }
}

module.exports = {
    counterApi
}



