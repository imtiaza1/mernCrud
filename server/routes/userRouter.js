const router = require("express").Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/", userController.createUser);

module.exports = router;
