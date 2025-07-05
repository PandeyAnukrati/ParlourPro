"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeAuthController_1 = require("../controllers/employeeAuthController");
const router = (0, express_1.Router)();
router.post('/login', employeeAuthController_1.employeeLogin);
exports.default = router;
