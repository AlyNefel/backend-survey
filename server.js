import express from "express"
import dontenv from "dotenv"
import cors from "cors"
 import taskRoutes from './routes/task.routes.js'
 import connectDB from "./config/db.config.js"
 import adminRoutes from './routes/admin.js'
import form from './routes/form.js'
dontenv.config()

const app =express();
app.use(cors())
app.use(cors({ origin: 'https://survey-master-class.netlify.app/' }));
app.use(express.json())
connectDB()
app.use(taskRoutes,adminRoutes,form)

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`our server is running on port ${PORT}`)
})




