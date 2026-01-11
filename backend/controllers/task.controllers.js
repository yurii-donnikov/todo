const db = require("../db/db");

class TaskController {
  async createTask(req, res) {
    const { title, status } = req.body;
    await db.query(
      "INSERT INTO tasks (title, status, user_id) values ($1, $2, $3) RETURNING *",
      [title, status, req.userId]
    );
    const tasks = await db.query("SELECT * FROM tasks where user_id = $1", [
      req.userId,
    ]);
    res.json(tasks.rows);
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
    await db.query(
      "UPDATE tasks set title = $1, status = $2 where id = $3 RETURNING *",
      [title, status, id]
    );
    const tasks = await db.query(
      "SELECT * FROM tasks where user_id = $1 ORDER BY id ASC",
      [req.userId]
    );
    res.json(tasks.rows);
  }

  async deleteTask(req, res) {
    const id = req.params.id;
    await db.query("DELETE from tasks where id = $1", [id]);
    const tasks = await db.query("SELECT * FROM tasks where user_id = $1", [
      req.userId,
    ]);
    res.json(tasks.rows);
  }
}

module.exports = new TaskController();
