const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// Express App
const app = express();

// Connect to MongoDB
const dbURI =
  "mongodb+srv://netninja:test1234@nodetuts.spyxg.mongodb.net/node-tuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Register View Engine
app.set("view engine", "ejs");

// Middleware & Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// Blog Routes
app.use("/blogs", blogRoutes);

// 404 Page (Must be at bottom of code)
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
