"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const employeeProfileController_1 = require("../controllers/employeeProfileController");
const router = (0, express_1.Router)();
router.get('/profile', auth_1.authenticateJWT, employeeProfileController_1.getEmployeeProfile);
exports.default = router;
