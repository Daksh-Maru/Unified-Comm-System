const userController = require("../controllers/user");
const express = require("express");
const { createUser, readUser, updateUser, deleteUser } = userController;

const router = express.Router();

router.get("/create", createUser);
router.get("/read", readUser);
router.get("/update", updateUser);
router.get("/delete", deleteUser);

module.exports = router;


