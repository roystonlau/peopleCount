import express from "express";
import app from "./routes/index.js";
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
