const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/UserAuthentication')
const { createUser, loginUser, allUsers, deleteUser, updateUser, self, changePassword, getUser, uploadImage } = require('../controllers/UserController');
const { addItem, foundItem, deleteItem, getAllUserLostItems, getAllUserFoundItems, getMyItems, addLikes, getLikes } = require('../controllers/UserItemController');

router.post('/api/register', createUser);
router.post('/api/login', loginUser);
router.post('/api/user/profile/uploadimage/:id', userAuth, uploadImage);
router.get('/api/user/profile/:id', userAuth, self);
router.get('/api/user/profile/items/:id', userAuth, getMyItems);
router.put('/api/user/profile/changepassword/:id', userAuth, changePassword);
router.post('/api/user/item/:id', userAuth, addItem);
router.post('/api/user/item/founditem/:id', userAuth, foundItem);
router.get('/api/users/lost/items', userAuth, getAllUserLostItems);
router.post('/api/users/lost/items/likes', userAuth, addLikes);
router.get('/api/users/lost/items/getlikes/:id', userAuth, getLikes);
router.get('/api/users/found/items', userAuth, getAllUserFoundItems);
router.post('/api/user/item/deleteitem/:id', userAuth, deleteItem);
router.post('/api/user', userAuth, getUser);


// Admin
router.get('/api/users', allUsers);
router.delete('/api/users/:id', deleteUser);
router.put('/api/users/:id', updateUser);

module.exports = router;