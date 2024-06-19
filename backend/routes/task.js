const router = require('express').Router();
const Task = require('../models/task');
const User = require('../models/user');
const  authenticateToken = require('../middlewares/authenticateToken.js');

//create task
router.post('/create-task', authenticateToken, async(req, res) => {
    try {
        const { title, description } = req.body;
        const { id} = req.headers;
        const newTask = new Task({ title: title, description: description });
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push:{tasks: taskId._id}});
        return res.status(200).json({ message: "Task created" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Task creation failed" });
    }
});

//get all task
router.get('/get-all-task', authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate({path: "tasks", options: { sort: { updatedAt: -1}}});
        return res.status(200).json({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Task retrieval failed" });
    }
});

//delete task
router.delete('/delete-task/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        const deleteTask = await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, {$pull: {tasks: id}});
        
        if (!deleteTask) {
            return res.status(404).json({ message: "Task does not exist" });
        }
        return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Task deletion failed" });
    }
});

//update task
router.put('/update-task/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, 
            { title: title, description: description },
            { new: true });

            if (!updatedTask) {
                return res.status(400).json({ message: "Task does not exist" });
            }

        return res.status(200).json({ message: "Task updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Task updation failed" });
    }
});

//update-important task
router.put('/update-important-task/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const taskData = await Task.findById(id);
        const importantData = taskData.important;
        await Task.findByIdAndUpdate(id, { important: !importantData });

        return res.status(200).json({ message: "Task importance updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Task importance updation failed" });
    }
});

//update-complete task
router.put('/update-complete-task/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const taskData = await Task.findById(id);
        const completeTask = taskData.complete;
        await Task.findByIdAndUpdate(id, { complete: !completeTask });

        return res.status(200).json({ message: "Task status updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Task status updation failed" });
    }
});

//get-important task
router.get('/get-important-task', authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const importantTask = await User.findById(id).populate({
            path: "tasks",
            match: { important : true }, 
            options: { sort: { updatedAt: -1}}
        });
        const importantTaskData = importantTask.tasks;
        return res.status(200).json({ data: importantTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Task retrieval failed" });
    }
});

//get-complete task
router.get('/get-complete-task', authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const completeTask = await User.findById(id).populate({
            path: "tasks",
            match: { complete : true }, 
            options: { sort: { updatedAt: -1}}
        });
        const completeTaskData = completeTask.tasks;
        return res.status(200).json({ data: completeTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Task retrieval failed" });
    }
});

//get-incomplete-task
router.get('/get-incomplete-task', authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const incompleteTask = await User.findById(id).populate({
            path: "tasks",
            match: { complete : false }, 
            options: { sort: { updatedAt: -1}}
        });
        const incompleteTaskData = incompleteTask.tasks;
        return res.status(200).json({ data: incompleteTaskData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Task retrieval failed" });
    }
});

module.exports = router;