const express = require("express");
const db = require("../data/dbConfig.js")
const actionRoute = require("./actions.js")
const projRoute = require("./projects.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send(`<h1>Server Up</h1>`);
});

server.use("/api/action", actionRoute);
server.use("/api/proj", projRoute);

module.exports = server;