const fs = require("fs");
const path = require("path");
const pool = require("../db");

async function runMigrations() {
  try {
    const initSQL = fs.readFileSync(
      path.join(__dirname, "../../migrations/init.sql"),
      "utf8",
    );

    const seedSQL = fs.readFileSync(
      path.join(__dirname, "../../migrations/seed.sql"),
      "utf8",
    );

    await pool.query(initSQL);
    console.log("Tables created");

    await pool.query(seedSQL);
    console.log("Seed data inserted");
  } catch (err) {
    console.error("Migration error:", err);
  }
}

module.exports = runMigrations;
