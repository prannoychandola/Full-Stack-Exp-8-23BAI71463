const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

// Dummy user
const user = {
  username: "user123",
  password: "password123"
};

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Middleware
function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.sendStatus(403);

  const token = header.split(" ")[1];
  jwt.verify(token, SECRET, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

// Protected Route
app.get("/protected", verifyToken, (req, res) => {
  res.json("Protected data from backend ✅");
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));