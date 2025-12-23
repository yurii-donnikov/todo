const Router = require("express");
const router = new Router();
const TaskController = require("../controllers/task.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/task", authMiddleware, TaskController.createTask);
router.get("/task/:id", authMiddleware, TaskController.getTaskById);
router.put("/task/:id", authMiddleware, TaskController.updatetask);
router.delete("/task/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
