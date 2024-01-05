import express from "express";
import app from "./routes/index.js";

const port = 4000;

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
