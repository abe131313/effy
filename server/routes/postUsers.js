const postUsersController = require('../controllers/handleUsers.js');
const {Router} = require('express');
const router = Router();


router.post('/registerusers',postUsersController.postUsers);

module.exports = router;