const express = require("express");
const compression = require("compression");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("Client server start");
});
