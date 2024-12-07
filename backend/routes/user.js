const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/',userController.fetchUsers);
router.get('/:id',userController.fetchOne);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router