//server
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express(); // create express app
const proxy = require("express-http-proxy");


//json-server
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);
//server.listen(8087);
app.use('/mocki', middlewares, router);
//


app.use(cors());
require('dotenv').config()

const bodyParser = require("body-parser");
const { default: axios } = require("axios");
app.use(bodyParser.json());


const mockiProxy = proxy(process.env.MOCKI_URL, {
  proxyReqPathResolver: (req) => {
    return req.baseUrl.replace("/mocki/", "");
  },
});

app.use('/api/*', async function (req, res, next) {
  var response
  if (req.method === "POST" || "PATCH") {
    response = await axios[req.method.toLowerCase()](`${process.env.SERVER_URL}${req.originalUrl.replace("/api", "")}`, req.body);
  } else {
    response = await axios[req.method.toLowerCase()](`${process.env.SERVER_URL}${req.originalUrl.replace("/api", "")}`);
  }
  res.json(response.data);
});


app.use("/mocki/*", mockiProxy);

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
