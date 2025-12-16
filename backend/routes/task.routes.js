const Router = require("express");
const router = new Router();
const TaskController = require("../controllers/task.controllers");

router.post("/task", TaskController.createTask);
router.get("/task/:id", TaskController.getTaskById);
router.put("/task/:id", TaskController.updatetask);
router.delete("/task/:id", TaskController.deleteTask);

module.exports = router;
