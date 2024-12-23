const zod = require("zod");

// Schema for creating a todo
const createtodo = zod.object({
    title: zod.string().nonempty("Title is required"),
    description: zod.string().nonempty("Description is required"),
});

// Schema for updating a todo
const updatetodo = zod.object({
    id: zod.string().nonempty("Todo ID is required"),
    completed: zod.boolean().optional(), // Optional `completed` field
});

module.exports = {
    createtodo,
    updatetodo,
};
