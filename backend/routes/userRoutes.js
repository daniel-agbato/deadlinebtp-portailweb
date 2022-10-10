const { registerUser, authUser, updateUserProfile, deleteUserProfile } = require("../controllers/userController");
const loggedinProtectedRoute = require("../middlewares/loggedinProtectedRoute");
const router = require("express").Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router
	.route("/profile")
	.patch(loggedinProtectedRoute, updateUserProfile)
	.delete(loggedinProtectedRoute, deleteUserProfile);

module.exports = router;
