import { getAllTasks, getTaskById, getLastThreeTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js'

import {Router} from "express"

const router = Router()

router.route("/tasks")
.get(getAllTasks)
.post(createTask)

router.get("/tasks/newest3",getLastThreeTasks)

router.route("/tasks/:id")
.put(updateTask)
.delete(deleteTask)
.get(getTaskById)

export default router