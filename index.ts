import express from "express";
import cors from "cors";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const todos: Todo[] = [];

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/tasks", (req, res) => {
  const {task} = req.body;
  const newTodo: Todo = {id: todos.length + 1, task, completed: false};
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.get("/api/tasks", (req, res) => {
  const {name, completed} = req.query;
  const filteredTodos = todos.filter((t) => {
    return (
      (name ? t.task.includes(name as string) : true) &&
      (completed ? t.completed === (completed === "true") : true)
    );
  });
  res.json(filteredTodos);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index > -1) {
    todos.splice(index, 1);
    res.status(200).json({message: "Deleted successfully"});
  } else {
    res.status(404).json({message: "Todo not found"});
  }
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {task, completed} = req.body;
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.task = task;
    todo.completed = completed;
    res.status(200).json(todo);
  } else {
    res.status(404).json({message: "Todo not found"});
  }
});

// Ustawienie serwera na porcie 22222
app.listen(22222, () => {
  console.log("Server running on port 22222");
});
