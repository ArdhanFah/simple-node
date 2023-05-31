const express = require("express");

const {
    getUsers, getUsersById, createUser, verifyToken, loginUser, destroyUser
} = require("../controllers/controllers")

const router = express.Router()

router.get('/users',verifyToken, getUsers)
router.get('/users/:id',verifyToken, getUsersById)
router.post('/users/register', createUser)
router.post('/users/login', loginUser)
router.delete('/users/:id', destroyUser)

module.exports = router;