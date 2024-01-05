import incidentRoute from "./incident/incident.route.js";

import express from "express";
import multer from "multer";

const upload = multer();

const app = express(); // start a server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.none());

app.use(incidentRoute);
export default app;
