const router = require("express").Router();
let Task = require("../models/task");

router.route('/').get((req, res) => {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const complete = false;
    const date = Date.parse(req.body.date);
  
    const newTask = new Task({
      title,
      description,
      complete,
      date
    });
  
    newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        task.title = req.body.title; 
        task.description = req.body.description;
        task.complete = req.body.complete;
        task.date = req.body.date;
  
        task.save()
          .then(() => res.json('Task updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;