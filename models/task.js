import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [5, 'Title must be at least 5 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: ['Low', 'Medium', 'High']
    },
    dueDate: {
      type: Date,
      required: [true, 'Due Date is required']
    }
  }, {
    timestamps: true
  });

  const Task = mongoose.model('Task', taskSchema);
export default Task;