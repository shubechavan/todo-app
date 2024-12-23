import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddTodo = async () => {
        setIsSubmitting(true); // Disable the button during submission
        try {
            const res = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            });
            const json = await res.json();
            console.log(json);

            if (res.ok) {
                alert("Todo added successfully!");
                setTitle("");
                setDescription("");
            } else {
                alert(json.message || "Failed to add todo.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the todo.");
        } finally {
            setIsSubmitting(false); // Re-enable the button
        }
    };

    return (
        <div>
            <input
                style={{
                    padding: 10,
                    margin: 10,
                    width: 300,
                    borderRadius: 5,
                    backgroundColor: "lightblue",
                    color: "black",
                }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
                style={{
                    padding: 10,
                    margin: 10,
                    width: 300,
                    borderRadius: 5,
                    backgroundColor: "lightblue",
                    color: "black",
                }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button
                style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 5,
                    backgroundColor: isSubmitting ? "gray" : "lightblue",
                    color: "white",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                onClick={handleAddTodo}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Adding..." : "Add Todo"}
            </button>
        </div>
    );
}
