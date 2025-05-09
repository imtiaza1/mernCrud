const router = require("express").Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/create", userController.createUser);
// get all users
router.get("/getallusers", userController.getUser);
// updateUser
router.put("/update/:id", userController.updateUser);
//Get user by id
router.get("/getuser/:id", userController.getUserById);
// delete
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
