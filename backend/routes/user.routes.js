const Router = require("express");
const router = new Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/user", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/me", authMiddleware, userController.autoLogin);

router.get("/user", authMiddleware, userController.getUsers);
router.get("/user/:id", authMiddleware, userController.getUser);
router.put("/user/:id", authMiddleware, userController.updateUser);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

module.exports = router;
