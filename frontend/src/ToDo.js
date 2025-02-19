import { useEffect, useState } from "react";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);

    const apiUrl = "http://localhost:8000";

    // Fetch Todo List on Component Mount
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${apiUrl}/todos`);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // Add Todo Item
    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) return;
        
        try {
            const response = await fetch(`${apiUrl}/todos`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            
            if (response.ok) {
                setTodos([...todos, { title, description }]);
                setMessage("Item added successfully!");
                setTitle("");
                setDescription("");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                setError("Unable to create todo item");
            }
        } catch (error) {
            console.log("Error adding todo:", error.message);
            setError("Unable to add ToDo Item!");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    // Set Todo for Editing
    const handleEdit = (todo) => {
        setEditId(todo._id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };

    // Update Todo Item
    const handleUpdate = async () => {
        if (!editTitle || !editDescription) return;
        
        try {
            const response = await fetch(`${apiUrl}/todos/${editId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editTitle, description: editDescription })
            });
            
            if (response.ok) {
                setTodos(todos.map(todo => todo._id === editId ? { ...todo, title: editTitle, description: editDescription } : todo));
                setMessage("Edit successful!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
                setEditId(-1);
            } else {
                setError("Edit not successful");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } catch (error) {
            console.log("Error updating todo:", error.message);
            setError("Edit not successful");
                setTimeout(() => {
                    setError("");
                }, 3000);
        }
    };

    // Cancel Editing
    const handleEditCancel = () => setEditId(null);

    // Delete Todo Item
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/todos/${id}`, { method: "DELETE" });
            if (response.ok) {
                setTodos(todos.filter(todo => todo._id !== id));
                setMessage("Item deleted successfully!");
            } else {
                setError("Unable to delete item");
            }
        } catch (error) {
            console.log("Error deleting todo:", error);
        }
    };

    return (
        <div className="container">
            <h1>ToDo Project with MERN stack</h1>
            
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-error"> {error} </p>}
            {/* Add Todo Section */}
            <div className="col-6">
                <h3>Add Item</h3>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                <button className="btn btn-dark mt-2" onClick={handleSubmit}>Submit</button>
                {error && <p className="text-danger">{error}</p>}
            </div>
            
            {/* Todo List Section */}
            <ul className="list-group mt-3">
                {todos.length > 0 ? todos.map(todo => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editId === todo._id ? (
                            <>
                                <input className="form-control" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                <input className="form-control" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                                <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
                                <button className="btn btn-secondary" onClick={handleEditCancel}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span>{todo.title}</span>
                                <span>{todo.description}</span>
                                <button className="btn btn-warning" onClick={() => handleEdit(todo)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
                            </>
                        )}
                    </li>
                )) : (
                    <p>No Todos Available</p>
                )}
            </ul>
        </div>
    );
}