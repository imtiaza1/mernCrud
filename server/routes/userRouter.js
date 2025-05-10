const router = require("express").Router();
const userController = require("../controllers/userController");
const inputValidation = require("../middleware/authMiddleware");

// Create a new user
router.post("/create", inputValidation, userController.createUser);

// Get all users
router.get("/getallusers", userController.getUser);

// Update user
router.put("/update/:id", inputValidation, userController.updateUser);

// Get user by ID
router.get("/getuser/:id", userController.getUserById);

// Delete user
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
