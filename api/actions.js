const express = require("express");
const actionRoute = express.Router();
const db = require("../data/helpers/actionModel.js")
const dbProj = require("../data/helpers/projectModel.js")


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

// READ one action
actionRoute.get("/:id", isAction, (req, res) => {
	clg(req.params.id)
	db.get(req.params.id)
		.then(projsAll => {
			// clg(">>> GET one proj", projsAll);
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

// CREATE action
actionRoute.post("/", validateAction, (req, res) => {
	db.insert(req.body)
		.then(proj => {
			clg(">>> POST new action");
			res.status(201).json(proj);
		})
		.catch(err => {
			clg(err);
			res.status(500).json({
				msg: "Error CREATEing new action.",
				err: err
			})
		})
});

// UPDATE action
actionRoute.put("/:id", isProj, validateAction, (req, res) => {
	const id = req.params.id;
	const body = req.body;
	
	clg("for update", id, body);
	db.update(id, body)
		.then(proj => {
			// clg(">>> POST new proj");
			res.status(201).json(proj);
		})
		.catch(err => {
			// clg(err);
			res.status(500).json({
				msg: "Error CREATEing new proj.",
				err: err
			})
		})
});

// DELETE one action
actionRoute.delete("/:id", (req, res) => {
	clg(req.params.id)
	db.remove(req.params.id)
		.then(projDel => {
			res.status(200).json(`Removed ${projDel}`)
		})
		.catch(err => {
			clg(err);
			res.status(500).json({
				msg: "Error READing one single proj.",
				err: error
			});
		});
});



// clg(">>> is it an existing ACTION?");
function isAction(req, res, next) {
	db.get(req.params.id)
		.then(proj => {
			clg(proj);
			if (proj) {
				req.proj = proj;
				clg("> > > Yes it's an Action.")
				next();
			} else {
				clg("! ! ! No. 109")
				res.status(404).json({
					message: "invalid action id",
					loc: "projects.js > isAction()",
					error: err
				})
			}
		})
		.catch(err => {
			clg("! ! ! No. 118")
			res.status(500).json({
				message: "GET action problem, PROBABLY NOT AN ACTION",
				loc: "projects.js > isAction() > catch",
				error: err
			})
		})
	// next();
}


// clg(">>> is it a Project?");
function isProj(req, res, next) {
	const id = req.body.project_id
	dbProj.get(id)
		.then(proj => {
			clg("134", proj);
			if (proj) {
				req.proj = proj;
				clg("> > > Yes it's a project.")
				next();
			} else {
				clg("! ! ! No. 139")
				res.status(404).json({
					message: "invalid proj id",
					loc: "projects.js > isProj()",
					error: err
				})
			}
		})
		.catch(err => {
			clg("! ! ! No. 148")
			res.status(500).json({
				message: "GET proj problem PROBABLY NOT A PROJECT",
				loc: "actions.js > isProj() > catch",
				error: err
			})
		})
	// next();
}

// clg(">>> is the ACTION body Valid?");
function validateAction(req, res, next) {
	clg(">>> is the body Valid?");

	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: "need to fill out the fields",
			loc: "actions.js > validateAction()",
		})
	}
	if (!req.body.project_id) {
		res.status(400).json({
			message: "need project_id",
			loc: "actions.js > validateAction()",
		})
	}
	if (!req.body.notes) {
		res.status(400).json({
			message: "need notes field",
			loc: "actions.js > validateAction()",
		})
	}
	if (!req.body.description) {
		res.status(400).json({
			message: "need description field",
			loc: "actions.js > validateAction()",
		})
	}
	clg("> > > Yes Valid Body")
	next();
}


module.exports = actionRoute;