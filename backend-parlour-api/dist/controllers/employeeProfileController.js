import Employee from '../models/Employee.js';
export async function getEmployeeProfile(req, res) {
    try {
        const employeeId = req.user?.id;
        if (!employeeId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const employee = await Employee.findById(employeeId).select('-password');
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.json({ employee });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
//# sourceMappingURL=employeeProfileController.js.map