const express = require("express");
const app = express();
const { getInstance } = require("../db/db");
const db = getInstance();

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const getAllTodos = await db.task.findMany();
    return res.status(200).json(getAllTodos);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Some error occured",
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const getTodo = await db.task.findFirst({
      where: {
        id,
      },
    });

    if (!getTodo) {
      return res.status(404).json("Item not found");
    }

    return res.status(200).json(getTodo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Some error occured",
    });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    const postTodo = await db.task.create({
      data: {
        title,
        description,
      },
    });

    return res.status(201).json({
      message: "Todo created successfully",
      postTodo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Some error occured",
    });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await db.task.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    const deleteTodo = await db.task.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: "Todo deleted successfully",
      deleteTodo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Some error occured",
    });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const { title, description } = req.body;
    const updateTodo = await db.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        updatedAt: new Date(),
      },
    });
    return res.status(200).json({
      message: "Todo updated successfully",
      updateTodo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Some error occured",
    });
  }
});

module.exports = app;
