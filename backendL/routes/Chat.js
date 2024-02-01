const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/UserAuthentication')

const { enterChatRoom, messages } = require('../controllers/ChatController');

router.post('/api/user/create/chatroom', userAuth, enterChatRoom);
router.post('/api/user/create/chat', userAuth, messages);

module.exports = router;