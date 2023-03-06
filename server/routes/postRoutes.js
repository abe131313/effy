const postCompaniesController = require('../controllers/postCompanies.js');
const {Router} = require('express');
const router = Router();

router.post('/registercompany',postCompaniesController.createCompany);
router.get('/getcompanies',postCompaniesController.getCompanies);
router.post('/deleteCompany',postCompaniesController.deleteCompany);


module.exports = router;