const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class UserController {
  async createUser(req, res) {
    const { email, password, name } = req.body;
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newPerson = await db.query(
        "INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
      );
      const token = jwt.sign(
        { userId: newPerson.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ user: newPerson.rows[0], token: token });
    } catch {
      if (err.code === "23505") {
        return res
          .status(409)
          .json({ message: "User with this email already exists" });
      }

      res.status(500).json({ message: "Server error" });
    }
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const users = await db.query(
      "UPDATE users set name = $1, email = $2, password = $3 where id = $4 RETURNING *",
      [name, email, hashedPassword, id]
    );
    res.json(users.rows);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const users = await db.query("DELETE from users where id = $1", [id]);
    res.json(users.rows);
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const match = await bcrypt.compare(password, user.rows[0].password);

    if (match) {
      const token = jwt.sign(
        { userId: user.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ user: user.rows[0], token: token });
    } else {
      res.json("неверный пароль");
    }
  }

  async autoLogin(req, res) {
    const { token } = req.body;
    try {
      const user = await db.query("SELECT * FROM users WHERE id = $1", [
        req.userId,
      ]);
      res.json({ user: user.rows[0], token: token });
    } catch {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
  }
}

module.exports = new UserController();
