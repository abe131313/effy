const postCompaniesController = require('../controllers/postCompanies.js');
const {Router} = require('express');
const router = Router();

router.post('/registercompany',postCompaniesController.createCompany);
router.get('/getcompanies',postCompaniesController.getCompanies);
router.post('/deleteCompany',postCompaniesController.deleteCompany);
router.post('/getSpecificCompany',postCompaniesController.getSpecificCompany);


module.exports = router;