"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeTaskController_1 = require("../controllers/employeeTaskController");
const router = (0, express_1.Router)();
router.get('/:employeeId', employeeTaskController_1.getTasksForEmployee);
exports.default = router;
