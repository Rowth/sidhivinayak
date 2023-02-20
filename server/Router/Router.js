const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminControllers');
const CatgoryController = require('../Controllers/CategoryControllers');
const StateCityController = require('../Controllers/StateControllers');
const subCategoryController = require('../Controllers/subCategoryController');
const NewsController = require('../Controllers/NewsControllers')
const subSubCatController = require('../Controllers/subSubCatController');
const NatureOfNewsController = require('../Controllers/NatureNewsController')
const counterController = require('../Controllers/counterWork');
const jwtAuther = require("../Jwt/jwt");
const ads = require('../models/advertisement');


router.post('/api/Register', jwtAuther.verifyTokens, AdminController.Register);
router.post('/api/LogIn', AdminController.LogIn);
router.post('/api/forgetPassword', AdminController.forgetPassword);
router.post('/api/resetPassword', AdminController.resetPassword);
router.get('/api/paticularUser', AdminController.paticularUser);
router.post('/api/changePassword', AdminController.changePassword);
router.get('/api/getAdminData', AdminController.getAdminData);
router.delete('/api/deleteUser/:id', jwtAuther.verifyTokens, AdminController.deleteUser);
router.put('/api/userUpdate', jwtAuther.verifyTokens, AdminController.userUpdate);


// #####category routing####
router.post('/api/addCategory', jwtAuther.verifyTokens, CatgoryController.addCategory);
router.get('/api/getAllCategory', CatgoryController.getAllCategory);
// router.put('/updateCategory', CatgoryController.updateCategory);
router.delete('/api/deleteCategory/:id', jwtAuther.verifyTokens, CatgoryController.deleteCategory);
// #####states routing####
router.post('/api/addStates', StateCityController.addStates);
router.get('/api/getAllStates', StateCityController.getAllStates);
router.put('/api/updateState/:id', StateCityController.updateState);
// ######cityes routing###
router.post('/api/addCityes', StateCityController.addCityes);
router.get('/api/getCities', StateCityController.getCities);
router.put('/api/updateCities', StateCityController.updateCities);
router.delete('/api/deleteCities/:id', StateCityController.deleteCities);
// #####subcategory routing#######
router.post('/api/addSubCategory', jwtAuther.verifyTokens, subCategoryController.addSubCategory);
router.get('/api/allGetSubCategory', subCategoryController.allGetSubCategory);
router.get('/api/getSubCategory', subCategoryController.getSubCategory);
router.put('/api/updateSubCategory', subCategoryController.updateSubCategory);
router.delete('/api/deleteSubCategory/:id', jwtAuther.verifyTokens, subCategoryController.deleteSubCategory);
// ####News routing###
// router.post('/addNews', NewsController.addNews);
router.get('/api/getNews/:limit/:page', NewsController.getNews);
router.get('/api/getOneNews', NewsController.getOneNews);
router.get('/api/getCateNews', NewsController.getCateNews);
router.get('/api/getNewsCate', NewsController.getNewsCate);

router.put('/api/updateNews', NewsController.updateNews);
router.delete('/api/deleteNews/:id', jwtAuther.verifyTokens, NewsController.deleteNews);
// #####subSubCat API####
router.post('/api/addSubSubCat', subSubCatController.addSubTwoCat);
router.get('/api/paticularSubTwoCat', subSubCatController.paticularSubTwoCat);
router.get('/api/getSubSubCat', subSubCatController.getSubTwoCat);
router.delete('/api/deleteSubSubCat/:id', subSubCatController.deleteSubSubCat);

// ###NatureOfNews###
router.post('/api/addNatureNews', jwtAuther.verifyTokens, NatureOfNewsController.addNatureNews);
router.get('/api/getAllNatureNews', NatureOfNewsController.getAllNatureNews);
router.delete('/api/deleteNatureNews/:id', jwtAuther.verifyTokens, NatureOfNewsController.deleteNatureNews);

// #####search API### 
router.post('/api/search', NewsController.searchApi);
// ###counter api###
router.get('/api/counterApi', counterController.counterApi);

//news  
router.post('/api/addNews', jwtAuther.verifyTokens, NewsController.upload.single("file"), async function (req, res) {
  console.log(req.body, "---")
  if (req.file != undefined) {
    var s3key = await NewsController.uploadS3(req.file);
  }
  const id = req.body.id;
  if (!id) {
    if (req.body.subCategoryId == '' || req.body.subCategoryName == '') {
      delete req.body.subCategoryId;
      delete req.body.subCategoryName;
    }
    if (req.body.subSubCateId == '' || req.body.subSubCateName == '') {
      delete req.body.subSubCateId;
      delete req.body.subSubCateName;
    }
  }
  if (s3key || !req.body.image) {
    const news = {
      title: req.body.title,
      Subtitle: req.body.Subtitle,
      image: s3key,
      news: req.body.news,
      engTitle: req.body.engText,
      natureNews: req.body.naturename,
      natureId: req.body.natureid,
      imageTitle: req.body.imageCap,
      createrName: req.body.creatername,
      categoryId: req.body.categoryId,
      categroyName: req.body.categroyName,
      subCategoryId: req.body.subCategoryId,
      subCategoryName: req.body.subCategoryName,
      subSubCateName: req.body.subSubCateName,
      subSubCateId: req.body.subSubCateId,
      keyWords: req.body.keyWord
    }
    if (!id) {
      const neews = await NewsController.addNews(s3key, news);
      if (neews) {
        res.status(200).json({ status: 200, message: "News Successfully Added", responseData: neews })
      } else {
        res.status(500).json({ status: 500, message: "News Not Added" })
      }
    } else {
      const update = await NewsController.updateNews(id, news)
      if (update) {
        res.json({ status: 200, message: "News Successfully Updated", responseData: update })
      } else {
        res.status(500).json({ status: 500, message: "News Not Updated" })
      }
    }
  }

})
router.post('/api/addAds', jwtAuther.verifyTokens, NewsController.upload.single("file"), async function (req, res) {

  var s3key = await NewsController.uploadS3(req.file);
  const id = req.body.id;
  if (s3key || !req.body.image) {
    let limtTime = req.body.time.split(':');
    let milliSeconds
    if (limtTime != undefined || limtTime != null) {
      let hours = limtTime[0] * 3600000;
      let minutes = limtTime[1] * 60000
      let seconds = limtTime[2] * 1000;
      milliSeconds = hours + minutes + seconds;
    }
    const adsField = {
      image: s3key,
      adsCategoryId: req.body.categoryid,
      adsCategoryName: req.body.categoryname,
      adsSubcateId: req.body.subcateid,
      adsSubcateName: req.body.subcatename,
      adsSubSubCateId: req.body.subsubcateid,
      adsSubSubCateName: req.body.subsubcatename,
      time: req.body.time,
      url: req.body.url,
      title: req.body.title,
      filetype: req.body.type,
      viewOrder: req.body.newOrder,
      milliSec: milliSeconds
    }
    if (!id) {
      const ads = await NewsController.addAds(s3key, adsField);
      if (ads) {
        res.status(200).json({ status: 200, message: "Adds Successfully Added", responseData: ads })
      } else {
        res.status(500).json({ status: 500, message: "Adds Not Added" })
      }
    } else {
      const update = await NewsController.updateAds(id, adsField)
      if (update) {
        res.json({ status: 200, message: "Adds Successfully Updated", responseData: update })
      } else {
        res.status(500).json({ status: 500, message: "Adds Not Updated" })

      }
    }
  }
})
router.get('/api/getAds', NewsController.getAds);
router.get('/api/getOneAds', NewsController.getOneAds);
router.delete('/api/deleteAds/:id', jwtAuther.verifyTokens, NewsController.deleteAds);

// ****websetting work***
router.post('/api/postWebData', NewsController.upload.single("file"), async function (req, res) {
  var s3key = await NewsController.uploadS3(req.file);
  const id = req.body.id;
  if (s3key || !req.body.image) {
    const adsField = {
      logo: s3key,
      facebook: req.body.fdLink,
      twitter: req.body.twLink,
      instagram: req.body.instLink,
      linkedIn: req.body.linkInLink,
      offersirName: req.body.offersirName,
      editor: req.body.editor,
      email: req.body.email,
      email1: req.body.email1,
      Residentials1: req.body.Residentials1,
      Residentials2: req.body.Residentials2,
      Residentials3: req.body.Residentials3,
      phone: req.body.phone,
      addressContact: req.body.addressContact,
      Website: req.body.website,
    }
    if (!id) {
      const webData = await NewsController.addLogoLink(s3key, adsField);
      if (webData) {
        res.status(200).json({ status: 200, message: "Data Successfully Added", responseData: webData })
      } else {
        res.status(500).json({ status: 500, message: "Data Not Added" })
      }
    } else {
      const updateWed = await NewsController.updataLogoLink(id, adsField)
      if (updateWed) {
        res.json({ status: 200, message: "Data Successfully Updated", responseData: updateWed })
      } else {
        res.status(500).json({ status: 500, message: "Data Not Updated" })
      }
    }
  }
})
router.get('/api/getSettingData', NewsController.getSettingData);



module.exports = router