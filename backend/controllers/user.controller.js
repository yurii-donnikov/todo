const db = require("../db/db");

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    const newPerson = await db.query(
      "INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.json(newPerson.rows[0]);
  }
  async getUsers(req, res) {
    const users = await db.query("SELECT * FROM users");
    res.json(users.rows);
  }
  async getUser(req, res) {
    const id = req.params.id;
    const users = await db.query("SELECT * FROM users where id = $1", [id]);
    res.json(users.rows);
  }
  async updateUser(req, res) {
    const { name, email, password } = req.body;
    const id = req.params.id;
    const users = await db.query(
      "UPDATE users set name = $1, email = $2, password = $3 where id = $4 RETURNING *",
      [name, email, password, id]
    );
    res.json(users.rows);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const users = await db.query("DELETE from users where id = $1", [id]);
    res.json(users.rows);
  }
}

module.exports = new UserController();
