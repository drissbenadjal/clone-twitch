const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database!");
  }
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.post("/api/getstream", (req, res) => {
  let name = req.body.name;
  db.query(
    "SELECT streamKey, id FROM utilisateurs WHERE pseudo = ?",
    [name],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ streamKey: null, id: null });
      } else {
        if (results.length > 0) {
          res.status(200).json({ streamKey: results[0].streamKey, id: results[0].id });
        } else {
          res.status(200).json({ streamKey: null, id: null });
        }
      }
    }
  );
});

app.post("/api/getislive", (req, res) => {
  let name = req.body.name;
  db.query(
    "SELECT isLive FROM utilisateurs WHERE pseudo = ?",
    [name],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ isLive: false });
      } else {
        if (results.length > 0) {
          res.status(200).json({ isLive: results[0].isLive });
        } else {
          res.status(200).json({ isLive: false });
        }
      }
    }
  );
});

app.post("/api/getuserinfos", (req, res) => {
  let name = req.body.name;
  db.query(
    "SELECT pseudo, offlineScreen FROM utilisateurs WHERE pseudo = ?",
    [name],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ pseudo: null, offlineScreen: null });
      } else {
        if (results.length > 0) {
          res.status(200).json({ pseudo: results[0].pseudo, offlineScreen: results[0].offlineScreen });
        } else {
          res.status(200).json({ pseudo: null, offlineScreen: null });
        }
      }
    }
  );
});

app.post("/api/getchatmessages", (req, res) => {
  let id = req.body.streamid;
  db.query("SELECT * FROM chat_channel WHERE streamer_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ messages: null });
      } else {
        if (results.length > 0) {
          db.query("SELECT * FROM utilisateurs WHERE id = ?", [results[0].utilisateur_id], (err, results2) => {
            if (err) {
              console.error("Error querying database:", err);
              res.status(500).json({ messages: null });
            } else {
              if (results2.length > 0) {
                results.forEach(element => {
                  element.pseudo = results2[0].pseudo;
                });
                res.status(200).json({ messages: results });
              }
              else {
                res.status(200).json({ messages: null });
              }
            }
          });
        } else {
          res.status(200).json({ messages: null });
        }
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
