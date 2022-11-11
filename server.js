//server
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express(); // create express app
const proxy = require("express-http-proxy");
app.use(cors());
require('dotenv').config()

const bodyParser = require("body-parser");
const { default: axios } = require("axios");
app.use(bodyParser.json());

app.use("/api/*", async function (req, res, next) {
  var response;
  const uri = `${process.env.SERVER_URL}${req.originalUrl.replace(
    "/api/",
    ""
  )}`;
  if (req.headers['x-auth-token']) {
    axios.defaults.headers.common['x-auth-token'] = req.headers['x-auth-token'];
  }
  // Se distribuyen los metodos en secciones especificas para hacer uso de las funciones de axios.
  if (req.method === "GET") {
    response = await axios.get(uri);
  } else if (req.method === "POST") {
    response = await axios.post(uri, req.body);
  } else if (req.method === "PUT") {
    response = await axios.put(uri, req.body);
  } else if (req.method === "PATCH") {
    response = await axios.patch(uri, req.body);
  } else if (req.method === "DELETE") {
    response = await axios.delete(uri, { data: req.body });
  }
  res.json(response.data);
});


// add middlewares
const root = require("path").join(__dirname, "dist");
app.use(express.static(root));

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// start express server on port 85
app.listen(process.env.SERVER_PORT, () => {
  console.log(`server started on port ${process.env.SERVER_PORT}`);
});
