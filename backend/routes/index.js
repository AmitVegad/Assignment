var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

/* GET home page. */
router.get('/', userController.getUser);

router.post('/add', userController.addUSer);

router.delete('/delete/:userId', userController.deleteUser);

router.put('/edit', userController.updateUser);

module.exports = router;
