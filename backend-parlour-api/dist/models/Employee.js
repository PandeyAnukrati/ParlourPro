import mongoose, { Schema } from 'mongoose';
const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for employee login
});
export default mongoose.model('Employee', EmployeeSchema);
//# sourceMappingURL=Employee.js.map