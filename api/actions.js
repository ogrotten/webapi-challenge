const express = require("express");
const actionRoute = express.Router();
const db = require("../data/helpers/actionModel.js")

function clg(...x) {
	console.log(...x);
}

// basic READ all actions
actionRoute.get("/", (req, res) => {
	db.get()
		.then(actions => {
			clg(">>> GET actions all", actions);
			res.status(200).json(actions);
		})
		.catch(error => {
			res.status(500).json({
				msg: "Error READing all actions.",
				err: error
			});
		});
});



module.exports = actionRoute;