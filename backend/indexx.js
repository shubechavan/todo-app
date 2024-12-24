const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createtodo, updatetodo } = require('./types'); 
const todos = require('./db'); 
const {MONGODB_URI} = require('/todoapp/config');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createtodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({ message: 'Invalid inputs' });
        return;
    }

    await todos.create({
        title: createPayload.title,
        description: createPayload.description,
    });

    res.json({ success: "todo created" });
});

app.get("/todos", async function (req, res) {
    console.log("Fetching your data");
    const allTodos = await todos.find({});
    res.json({
        todos: allTodos,
    });
});

app.put("/todocompleted", async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updatetodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).json({ message: 'Invalid inputs' });
        return;
    }

    await todos.updateOne(
        { _id: req.body.id },
        { $set: { completed: true } }
    );

    res.json({ success: "todo completed" });
});

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});
