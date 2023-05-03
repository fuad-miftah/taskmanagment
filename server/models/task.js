const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	complete: { type: Boolean },
	date: {type: Date, required: true}
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;