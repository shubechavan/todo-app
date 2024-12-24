const zod = require("zod");

const createtodo = zod.object({
    title: zod.string().nonempty("Title is required"),
    description: zod.string().nonempty("Description is required"),
});

const updatetodo = zod.object({
    id: zod.string().nonempty("Todo ID is required"),
    completed: zod.boolean().optional(), 
});

module.exports = {
    createtodo,
    updatetodo,
};
