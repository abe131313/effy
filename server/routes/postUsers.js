const postUsersController = require('../controllers/handleUsers.js');
const {Router} = require('express');
const router = Router();


router.post('/registerusers',postUsersController.postUsers);
router.post('/fetchUsersundercompany',postUsersController.fetchUsersUnderCompany);
router.post('/deleteUsers',postUsersController.deletUsers);
router.post('/updateUsers',postUsersController.updateUsers);


module.exports = router;