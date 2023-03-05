const postCompaniesController = require('../controllers/postCompanies.js');
const {Router} = require('express');
const router = Router();

router.post('/registercompany',postCompaniesController.createCompany);
router.get('/getcompanies',postCompaniesController.getCompanies);

module.exports = router;