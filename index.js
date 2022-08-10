const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

const mockUsers = [
  {
    username: "Ben",
    email: "ben.s@mcrcodes.ac",
    password: "supermelon"
  },
  {
    username: "Stu",
    email: "stu@mcrcodes.ac",
    password: "tableread"
  }
];

// TODO
// validate request is good with joi, return 400 with message if not
// validate credentials in request match a record in mockUsers
// if matched, create a token and return it. If not, return 200 with error

app.get("/api/users", (req, res) => {
  res.send(mockUsers)
});

app.get("/api/auth/users/:user", (req, res) => {
  const { user } = req.params;
  const { username, email, passhash } = req.body
  if (user !== username) res.status(404).send("Credentials invalid")
  const matchedUser = mockUsers.find(user => user.username === username);
  if (!matchedUser) {
    res.status(404).send("Credentials invalid")
    return
  };
  if (matchedUser.email === email && matchedUser.password === passhash) {
    res.status(200).send(matchedUser)
    return
  }
  res.status(500).send("server error")
});

const port = process.env.PORT
app.listen(port, console.log(`listening on port ${port}...`));