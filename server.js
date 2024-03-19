"use client";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "alwinsys",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * from quiz";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) =>  {
  const { question, option1, option2 , option3, option4, correctAnswer} = req.body;
  const sqlInsert = "INSERT INTO quiz (question, option1, option2 , option3, option4, correctAnswer) VALUES (?,?,?,?,?,?)";
  db.query(sqlInsert,[question, option1, option2 , option3, option4, correctAnswer], (error, result) => {
    if(error){
      console.log(error);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(5000, () => {
  console.log("Server is running on Port 5000");
});
