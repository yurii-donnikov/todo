const db = require("../db/db");

class TaskController {
  async createTask(req, res) {
    const { title, status, user_id } = req.body;
    const newTask = await db.query(
      "INSERT INTO tasks (title, status, user_id) values ($1, $2, $3) RETURNING *",
      [title, status, user_id]
    );
    res.json(newTask.rows[0]);
  }
  async getTaskById(req, res) {
    const id = req.userId;
    const tasks = await db.query("SELECT * FROM tasks where user_id = $1", [
      id,
    ]);
    res.json(tasks.rows);
  }
  async updatetask(req, res) {
    const { title, status } = req.body;
    const id = req.params.id;
    const task = await db.query(
      "UPDATE tasks set title = $1, status = $2 where id = $3 RETURNING *",
      [title, status, id]
    );
    res.json(task.rows);
  }
  async deleteTask(req, res) {
    const id = req.params.id;
    const users = await db.query("DELETE from tasks where id = $1", [id]);
    res.json(users.rows);
  }
}

module.exports = new TaskController();
