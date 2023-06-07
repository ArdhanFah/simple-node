const express = require("express");

const {
    getUsers, getUsersById, createUser, verifyToken, loginUser, destroyUser
} = require("../controllers/UserControllers")

const getData  = require("../controllers/ShowRoomControllers")

const router = express.Router()

// User & Token
router.get('/users',verifyToken, getUsers)
router.get('/users/:id',verifyToken, getUsersById)
router.post('/users/register', createUser)
router.post('/users/login', loginUser)
router.delete('/users/:id', verifyToken, destroyUser)

// APP
router.get('/',verifyToken, getData)

module.exports = router;