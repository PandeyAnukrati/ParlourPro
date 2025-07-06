import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  assignedTo: Types.ObjectId; // reference to Employee
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
});

export default mongoose.model<ITask>('Task', TaskSchema);
