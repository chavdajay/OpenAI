const express = require('express');
const { createUser, getUsers, chatWithOpenAI } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.post('/chat', chatWithOpenAI);

module.exports = router;
