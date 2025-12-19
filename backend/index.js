const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");

const pool = require("./db/db");

const port = (process.env.port = 8080);

const app = express();

app.use(express.json());

app.use("/api", [userRouter, taskRouter]);

app.get("/debug/db", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`port ${port} works`);
});
