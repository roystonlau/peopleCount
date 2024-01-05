import "dotenv/config";
import express from "express";

import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { getIncidentType, insertIncident } from "../../gql.js";

const router = express.Router();

const client = new Client({
  url: process.env.HASURA_URL,
  fetchOptions: {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_SECRET,
    },
  },
  exchanges: [cacheExchange, fetchExchange],
});

router.post("/insertIncident", (req, res) => {
  console.log("incidentDetail", req.body);
  let incidentDetail = req.body;
  incidentDetail.reportedTime = new Date();
  client
    .mutation(insertIncident, incidentDetail)
    .toPromise()
    .then((result) => {
      let { data } = result;
      console.log("data", data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getIncidentType", (req, res) => {
  client
    .query(getIncidentType)
    .toPromise()
    .then((result) => {
      let { aohs_procedure_list } = result.data;

      res.json(aohs_procedure_list);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
