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

app.delete("/api/remove/:id", (req, res) =>  {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM quiz WHERE id = ?";
  db.query(sqlRemove,id, (error, result) => {
    if(error){
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const {id} = req.params;
  const sqlGet = "SELECT * from quiz where id = ?";
  db.query(sqlGet, (error, result) => {
    if(error){
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/get/:id", (req, res) => {
  const {id} = req.params;
  const { question, option1, option2 , option3, option4, correctAnswer} = req.body;
  const sqlEdit = "UPDATE quiz SET question=?, option1=?, option2=? , option3=?, option4=?, correctAnswer=? where id = ?";
  db.query(sqlEdit,[question, option1, option2 , option3, option4, correctAnswer], (error, result) => {
    if(error){
      console.log(error);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(5000, () => {
  console.log("Server is running on Port 5000");
});
