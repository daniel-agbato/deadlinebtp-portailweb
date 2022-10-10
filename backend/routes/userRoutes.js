const { registerUser, authUser } = require("../controllers/userController");
const router = require("express").Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
