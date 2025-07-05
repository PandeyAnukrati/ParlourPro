import mongoose, { Schema } from 'mongoose';
const TaskSchema = new Schema({
    title: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
});
export default mongoose.model('Task', TaskSchema);
