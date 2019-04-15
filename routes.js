var Todo = require("./models/Todo");
var express = require("express");
var router = express.Router();

router.route("/todos")
  .post((req, res) => {
    var todo = new Todo(req.body);
    todo.save()
      .then(todo => {
        res.status(200).json({ message: "Todo successfully added" });
      })
      .catch(err => {
        res.status(400).send("Error when saving to database");
      });
  })

  .get((req, res) => {
    Todo.find((err, todos) => {
      if (err) {
        console.log(err);
      }

      res.json(todos);
    });
  });

router
  .route("/todos/:id")
  .get((req, res) => {
    Todo.findById({ _id: req.params.id }, (err, todo) => {
      if (err) res.send(err);

      res.json(todo);
    });
  })

  .put((req, res) => {
    Todo.findById({_id:req.params.id}, (err, todo) => {
      if (!todo) 
        res.status(400).send("Error when getting the todo!");
      else {
        for(prop in req.body)
          todo[prop]=req.body[prop]
        
        todo.save()
          .then(todo => {
            res.status(200).json({ message: "Todo updated successfully"});
          })
          .catch(err => {
            res.status(400).send("Error when updating the todo");
          });
      }
    });
  })

  .delete((req, res) => {
    Todo.findOneAndDelete({ _id: req.params.id }, (err, todo) => {
      if (err) res.json(err);
      res.json({ message: "Todo successfully removed"});
    });
  });

module.exports = router;