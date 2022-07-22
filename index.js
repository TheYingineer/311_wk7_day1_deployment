const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const { logger } = require("./middleware");
const pool = require("./sql/connection");
// const mysql = require("mysql")

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(logger);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to our server!");
});

// get all
app.get("/games", (req, res) => {
  pool.query("SELECT * FROM games", (err, rows) => {
    res.json(rows);
  });
});

//get all by id
app.get("/games/:id", (req, res) => {
  pool.query(`SELECT * FROM games WHERE id = ${req.params.id}`, (err, rows) => {
    res.json(rows);
  });
});

//create games
app.post("/games", (req, res) => {
  const { body } = req;
  const { title, release_year, box_art, description, trailer, hero, developer } = body;
  pool.query(
    `INSERT INTO games (id, title, release_year, box_art, description, trailer, hero, developer) VALUES (?,?,?,?,?,?,?,?)`,
    [
      null, //id is autoincrement
      req.body.title,
      req.body.release_year,
      req.body.box_art,
      req.body.description,
      req.body.trailer,
      req.body.hero,
      req.body.developer,
    ],
    (err, status) => {
      res.json(status.insertId);
    }
  );
});




app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
