const express = require("express");
const projRoute = express.Router();
const db = require("../data/dbConfig.js")

function clg(...x) {
	console.log(...x);
}

// basic READ all actions
projRoute.get("/", (req, res) => {
	db.find(req.query)
		.then(posts => {
			clg(">>> GET posts all");
			res.status(200).json(posts);
		})
		.catch(error => {
			res.status(500).json({
				msg: "Error READing all posts."
			});
		});
});


module.exports = projRoute;