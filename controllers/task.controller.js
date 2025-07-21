import Task from '../models/task.js'

// get all tasks 
const getAllTasks=async(req,res)=>{
    try {
        const tasks=await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json(error);
    }
}

// getTaskById
const getTaskById =async(req,res)=>{
    try {
      const task=await Task.findById(req.params.id) 
      if (task) {
        res.json(task)
      } else {
        res.status(404).json({message:"Task not found !!"})
      } 
    } catch (error) {
        res.status(500).json(error);
    }
}

// create task 
const createTask=async(req,res)=>{
    try {
        const task =new Task(req.body)
        await task.save()
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json(error);
    }
}

// update 
const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found!' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
// get last three tasks
  const getLastThreeTasks = async (req, res) => {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 }).limit(3);
      res.json(tasks);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  //delete 
  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (task) {
        res.json({ message: 'Task deleted successfully!' });
      } else {
        res.status(404).json({ message: 'Task not found!' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export { getAllTasks, getTaskById, getLastThreeTasks, createTask, updateTask, deleteTask };
