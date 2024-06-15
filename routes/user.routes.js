const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser,signIn } = require('../controllers/user.controller');
const router = express.Router();
router.post("/",createUser)
router.post('/signin', signIn)
router.get("/",getAllUsers)
router.get("/:id",getUserById)
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);
module.exports.userRouter = router;