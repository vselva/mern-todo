// To load environment variables from a .env file into the process.env object
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
console.clear(); 

// middle ware - To parse incoming requests with JSON payloads
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connecting to Database
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Databse Connected'))
    .catch(err => console.log(err));

// ToDo Schema (structure, blueprint)
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is Required"],
        trim: true
    },
    completed: {
        type: Boolean
    }
});

// ToDo Model (Coloumns)
const TodoModel = mongoose.model('Todo', TodoSchema);

// Routes

// GET Todo List 
app.get('/todos', async (req, res) => {
    console.log(`Get Call Received!`);
    const todos = await TodoModel.find();
    res.json(todos);

});

// POST Todo
app.post('/todos', async (req, res) => {
    const {title, description, completed } = req.body;
    console.log(`Received POST call: title: ${title} description: ${description}`)
    try {
        const newTodo = new TodoModel ({
            title, 
            description,
            completed
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
});

// PUT Todo
app.put('/todos/:id', async (req, res) => {
    const { title, description, completed } = req.body;
    console.log(`Received PUT call: title: ${title} description: ${description}`)
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            {title, description, completed},
            {new: true}
        );

        if (!updatedTodo) {
            res.status(404).json({message: "Todo not found!"});
        }
        res.json(updatedTodo);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await TodoModel.findByIdAndDelete(id);
        res.status(204).end();    
    } catch (err) {
        console.log(`Error: ${err.message}`);
        res.status(500).json({message: err.message});
    }
});

// Listening at port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
