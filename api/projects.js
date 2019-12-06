const express = require("express");
const projRoute = express.Router();
const db = require("../data/helpers/projectModel.js")
function clg(...x) {
	console.log(...x);
}

// basic READ ALL projs
projRoute.get("/", (req, res) => {
	db.get()
		.then(projs => {
			clg(">>> GET PROJS all", projs);
			res.status(200).json(projs);
		})
		.catch(error => {
			res.status(500).json({
				msg: "Error READing all projs.",
				err: error
			});
		});
});

// READ one proj
projRoute.get("/:id", (req, res) => {
	clg(req.params.id)
	db.get(req.params.id)
		.then(projsAll => {
			clg(">>> GET one proj", projsAll);
			Object.entries(projsAll).length !== 0
				? res.status(200).json(projsAll)
				: res.status(404).json({ msg: "Nonexistant Proj. (READ one)" })
		})
		.catch(err => {
			clg(err);
			res.status(500).json({
				msg: "Error READing one single proj.",
				err: error
			});
		});
});

// CREATE proj
projRoute.post("/", validateProj, (req, res) => {
	db.insert(req.body)
		.then(proj => {
			clg(">>> POST new proj");
			res.status(201).json(proj);
		})
		.catch(err => {
			clg(err);
			res.status(500).json({
				msg: "Error CREATEing new proj.",
				err: error
			})
		})
});

function validateProj(req, res, next) {
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: "need to fill out the fields",
			loc: "projects.js > validateProj()",
		})
	}
	if (!req.body.name) {
		res.status(400).json({
			message: "need name field",
			loc: "projects.js > validateProj()",
		})
	}
	if (!req.body.description) {
		res.status(400).json({
			message: "need description field",
			loc: "projects.js > validateProj()",
		})
	}
	next();
}


module.exports = projRoute;