const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// View Engine
app.set("view engine", "ejs");

// Database Connection
const dbURI =
  "mongodb+srv://netninja:test1234@nodetuts.spyxg.mongodb.net/node-auth";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
